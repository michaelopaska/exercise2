"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This function returns all pokemon, or at least all pokemon that will appear on a specific page.
 * @param pagesize -- number of records we want returned
 * @param pagenum -- which page we are on, starts from 0
 * @param filter -- how we should order the records
 * @returns
 */
function getAllPokemon(pagesize, pagenum, filter) {
    if (pagesize === void 0) { pagesize = 50; }
    if (pagenum === void 0) { pagenum = 0; }
    if (filter === void 0) { filter = "id: asc"; }
    var rtnArr = [];
    fetch('https://beta.pokeapi.co/graphql/v1beta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: "\n        query samplePokeAPIquery {\n            pokemon_v2_pokemon(limit: ".concat(pagesize, ", offset: ").concat((pagenum * pagesize), ", order_by: {").concat(filter, "}) {\n              name\n              id\n              pokemon_v2_pokemontypes {\n                pokemon_v2_type {\n                  name\n                }\n              }\n            }\n          }\n        ") }),
    })
        .then(function (res) { return res.json(); })
        .then(function (result) {
        result.data.pokemon_v2_pokemon.forEach(function (element) {
            var types = [];
            element.pokemon_v2_pokemontypes.forEach(function (type) {
                types.push(type.pokemon_v2_type.name);
            });
            var pm = {
                id: element.id,
                name: element.name,
                sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/".concat(element.id),
                type: types,
            };
            // console.log(pm);
            rtnArr.push(pm);
        });
    });
    console.log(rtnArr);
    return rtnArr;
}
function getPokemon(id) {
    var returnPokemon = {};
    fetch('https://beta.pokeapi.co/graphql/v1beta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: "\n        query samplePokeAPIquery {\n            pokemon_v2_pokemon(where: {id: {_eq: ".concat(id, "}}) {\n              name\n              id\n              pokemon_v2_pokemonstats {\n                base_stat\n                pokemon_v2_stat {\n                  name\n                }\n              }\n              pokemon_v2_pokemontypes {\n                pokemon_v2_type {\n                  name\n                }\n              }\n              height\n              weight\n            }\n          }\n        ") }),
    })
        .then(function (res) { return res.json(); })
        .then(function (result) {
        result.data.pokemon_v2_pokemon.forEach(function (el) {
            var types = [];
            el.pokemon_v2_pokemontypes.forEach(function (type) {
                types.push(type.pokemon_v2_type.name);
            });
            returnPokemon.name = el.name;
            returnPokemon.id = el.id;
            returnPokemon.sprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/".concat(el.id);
            returnPokemon.type = types;
            returnPokemon.height = el.height;
            returnPokemon.weight = el.weight;
            returnPokemon.stats = {};
            el.pokemon_v2_pokemonstats.forEach(function (stat) {
                switch (stat.pokemon_v2_stat.name) {
                    case 'hp':
                        returnPokemon.stats.hp = stat.base_stat;
                        break;
                    case 'attack':
                        returnPokemon.stats.attack = stat.base_stat;
                        break;
                    case 'special-defense':
                        returnPokemon.stats.specialDefense = stat.base_stat;
                        break;
                    case 'special-attack':
                        returnPokemon.stats.specialAttack = stat.base_stat;
                        break;
                    case 'speed':
                        returnPokemon.stats.speed = stat.base_stat;
                        break;
                }
            });
            console.log(returnPokemon);
        });
    });
    return returnPokemon;
}
// let testvar = getAllPokemon();
// console.log(testvar);
var testvar = getPokemon(1);
console.log(testvar);
