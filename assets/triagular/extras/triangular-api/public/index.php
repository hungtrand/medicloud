<?php

define('PUBLIC_DIR', dirname(__FILE__));
define('ROOT_DIR', dirname(PUBLIC_DIR));
define('DATA_DIR', ROOT_DIR . '/data/');

// error_reporting(E_ALL);
// ini_set('display_errors', 1);

// Load the Slim framework
require_once '../vendor/autoload.php';
require_once '../vendor/palanik/corsslim/CorsSlim.php';

\Slim\Slim::registerAutoLoader();

$app = new \Slim\Slim();

// allow CORS requests
$corsOptions = new \CorsSlim\CorsSlim(array(
    'origin' => '*',
    'maxAge' => 1728000,
    'allowMethods' => array('POST, GET')
));
$app->add($corsOptions);

// all responses are in json
$app->response->headers->set('Content-Type', 'application/json');

// all requests are in json - add this so we dont have to json_decode everything
$app->request->headers->set('Content-Type', 'application/json');
$app->add(new \Slim\Middleware\ContentTypes());

$app->add(new \Slim\Middleware\SessionCookie(array(
    'expires' => '20 minutes',
    'path' => '/',
    'domain' => null,
    'secure' => false,
    'httponly' => false,
    'name' => 'slim_session',
    'secret' => 'CHANGE_ME',
    'cipher' => MCRYPT_RIJNDAEL_256,
    'cipher_mode' => MCRYPT_MODE_CBC
)));

$app->config(array(
    'debug' => true
));

$app->post('/login', function () use ($app) {
    // get sent user
    $request = $app->request->getBody();

    if (isset($request['email']) && isset($request['password'])) {
        // get the users from json data
        $users_data = file_get_contents(DATA_DIR . 'users/users.json');
        $users = json_decode($users_data, true);

        $found_user = null;
        // check to see if user exists
        foreach ($users as $user) {
            if ($request['email'] === $user['email'] && $request['password'] === $user['password']) {
                $found_user = $user;
            }
        }

        if (null !== $found_user) {
            // remove password from user data
            unset($found_user['password']);

            $app->response->setStatus(200);
            echo json_encode($found_user);
        } else {
            $app->response->setStatus(401);
        }
    } else {
        $app->response->setStatus(400);
    }

});

$app->post('/signup', function () use ($app) {
    // get sent user
    $request = $app->request->getBody();
    if (isset($request['name']) && isset($request['email']) && isset($request['password']) && isset($request['confirm']) && $request['password'] === $request['confirm']) {
        // add email signup confirmation here

        // return email address sent confirmation to
        echo json_encode(array(
            'email' => $request['email']
        ));
        $app->response->setStatus(200);
    } else {
        $app->response->setStatus(400);
    }
});

$app->post('/reset', function () use ($app) {
    // get sent user
    $request = $app->request->getBody();
    if (isset($request['email'])) {
        // get the users from json data
        $users_data = file_get_contents(DATA_DIR . 'users/users.json');
        $users = json_decode($users_data, true);

        $found_user = null;
        // check to see if user exists
        foreach ($users as $user) {
            if ($request['email'] === $user['email']) {
                $found_user = $user;
            }
        }

        if (null !== $found_user) {
            // send reset password here

            // return email address sent reset to
            echo json_encode(array(
                'email' => $request['email']
            ));

            $app->response->setStatus(200);
        } else {
            $app->response->setStatus(401);
        }
    } else {
        $app->response->setStatus(400);
    }
});

$app->get('/email/inbox', function () use ($app) {
    $faker = Faker\Factory::create();

    // generate some fake messages
    $messages = array();
    // get contact list
    $contacts = get_contacts();

    for ($i = 0; $i < 50; $i++) {
        $date = $faker->dateTimeThisMonth();

        // get random from contact
        $position = rand(0, count($contacts)-1);
        $from = $contacts[$position];

        // get random to contacts
        $to = array();
        $num_to = rand(1, 2);
        for ($x = 0; $x < $num_to; $x++) {
            $position = rand(0, count($contacts)-1);
            array_push($to, $contacts[$position]);
        }

        // get random cc contacts
        $cc = array();
        $num_cc = rand(0, 2);
        for ($x = 0; $x < $num_cc; $x++) {
            $position = rand(0, count($contacts)-1);
            array_push($cc, $contacts[$position]);
        }

        array_push($messages, array(
            'id' => uniqid(),
            'from' => $from,
            'to' => $to,
            'cc' => $cc,
            'subject' => $faker->realText(30),
            'content' => $faker->paragraphs,
            'unread' => true,
            'date' => $faker->dateTimeBetween($startDate = '-1 weeks', $endDate = 'now')->format(DateTime::ISO8601)
        ));
    }

    echo json_encode($messages);

    $app->response->setStatus(200);
});


$app->get('/email/contacts', function () use ($app) {
    $contacts = get_contacts();
    if (null !== $contacts) {
        $app->response->setStatus(200);
        echo json_encode($contacts);
    } else {
        $app->response->setStatus(401);
    }
});

$app->get('/elements/icons', function () use ($app) {
    // get the users from json data
    $icons_data = file_get_contents(DATA_DIR . 'icons/icons.json');
    $users = json_decode($icons_data, true);

    if (null !== $users) {
        $app->response->setStatus(200);
        echo json_encode($users);
    } else {
        $app->response->setStatus(401);
    }
});

$app->get('/elements/icons-fa', function () use ($app) {
    // get the users from json data
    $icons_data = file_get_contents(DATA_DIR . 'icons/fa.json');
    $users = json_decode($icons_data, true);

    if (null !== $users) {
        $app->response->setStatus(200);
        echo json_encode($users);
    } else {
        $app->response->setStatus(401);
    }
});


// data functions
function get_contacts() {
    // get the users from json data
    $contacts_data = file_get_contents(DATA_DIR . 'email/contacts.json');
    return json_decode($contacts_data, true);
}


// Options stubs
$app->options('/login', function () {});
$app->options('/signup', function () {});
$app->options('/reset', function () {});
$app->options('/email/inbox', function () {});
$app->options('/email/contacts', function () {});
$app->options('/elements/icons', function () {});

$app->run();
