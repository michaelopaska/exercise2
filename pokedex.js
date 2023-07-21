"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
    return __awaiter(this, void 0, void 0, function () {
        var arrayOfPokemon, res, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    arrayOfPokemon = [];
                    return [4 /*yield*/, fetch('https://beta.pokeapi.co/graphql/v1beta', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ query: "\n        query samplePokeAPIquery {\n            pokemon_v2_pokemon(limit: ".concat(pagesize, ", offset: ").concat((pagenum * pagesize), ", where: {is_default: {_eq: true}}, order_by: {").concat(filter, "}) {\n              name\n              id\n              pokemon_v2_pokemontypes {\n                pokemon_v2_type {\n                  name\n                }\n              }\n            }\n          }\n        ") }),
                        })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    result = _a.sent();
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
                        arrayOfPokemon.push(pm);
                    });
                    return [2 /*return*/, arrayOfPokemon];
            }
        });
    });
}
function getPokemon(id) {
    return __awaiter(this, void 0, void 0, function () {
        var returnPokemon, res, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    returnPokemon = {};
                    return [4 /*yield*/, fetch('https://beta.pokeapi.co/graphql/v1beta', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ query: "\n        query samplePokeAPIquery {\n            pokemon_v2_pokemon(where: {id: {_eq: ".concat(id, "}, is_default:{_eq: true}}) {\n              name\n              id\n              pokemon_v2_pokemonstats {\n                base_stat\n                pokemon_v2_stat {\n                  name\n                }\n              }\n              pokemon_v2_pokemontypes {\n                pokemon_v2_type {\n                  name\n                }\n              }\n              height\n              weight\n            }\n          }\n        ") }),
                        })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    result = _a.sent();
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
                    });
                    return [2 /*return*/, returnPokemon];
            }
        });
    });
}
var aop = getAllPokemon();
aop.then(function (res) { return console.log(res); });
// let testvar = getPokemon(1);
// testvar.then((res) => console.log(res));
