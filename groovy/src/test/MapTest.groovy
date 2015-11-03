package test

class MapTest {
	public static void main(args){
		Map map = [:]
		def map2 = ["Jim":"Knopf", "Thomas":"Edison"]
		println map2["Jim"]
		map2["Test"] = "Tester"
		println map2["Test"]

		Map map1 = [name: "book1", year: 2010]

		map1['name'] = "book1 2e"
		map1.year = 2013
		map1 << [author: "John"]

		map1.each { key, value ->
			println "${key} = ${value}"
		}
	}
}
