package test
import groovy.json.*;

class JsonBuilderExm {
	public static void main(args){
		def builder = new JsonBuilder()
		builder.people {
			person {
				firstName 'Kyle'
				lastName 'Lin'
				address(
					city: 'Taichung',
					country: 'Taiwan'
				)
			}
		}
		 
		println builder.toPrettyString()
	}
}
