name: *"David" | string
age: int | *21

#Profile: {
	name: string
	handles: {
		githut: string
		twitter: string
	}
}

profiles: [...#Profile]
profiles: [
	{
		name: "Yuri"
		handles: {
			githut: "krupnik"
			twitter: "krupnik"
		}
	}
]

#Album: {
	artist: string
	title: string
	year: int
}

album: #Album & {
	artist: "metallica"
	title: "Black album"
	year: 1991
}

//name: "Yuri"
//age: 40
//kubernetes: {
//	apiVersion: "apps/v1"
//	kind: "Deployment"
//	metadata: {
//		labels: {
//			name: "yuri"
//		}
//	}
//	spec: {
//		template: {
//			metadata: kubernetes.metadata
//			containers: {
//				image: "nginx"
//			}
//		}
//	}
//}

