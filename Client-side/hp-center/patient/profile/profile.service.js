function profileService($resourceProvider) {
	return {
		data: {
			personal: {
				name: 'David Beckham',
				birthdate: '01/01/1911',
				occupation: 'Programmer',
				city: 'San Jose',
				state: 'California'
			},

			encounters: {
				lastVisitDate: '01/12/2012',
				patientSince: '01/02/2003',
				history: []
			},

			notes: ['A very long notes']
		}
	}
}