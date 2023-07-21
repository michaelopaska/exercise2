import {PokemonSummary} from './PokemonSummary'
import {PokemonDetail} from './PokemonDetail'

/**
 * This function returns all pokemon, or at least all pokemon that will appear on a specific page.
 * @param pagesize -- number of records we want returned
 * @param pagenum -- which page we are on, starts from 0
 * @param filter -- how we should order the records
 * @returns 
 */
async function getAllPokemon(pagesize: number = 50, pagenum: number = 0, filter: string = "id: asc"): Promise<PokemonSummary[]>{
    const arrayOfPokemon: PokemonSummary[] = [];
    const res = await fetch('https://beta.pokeapi.co/graphql/v1beta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({query: `
        query samplePokeAPIquery {
            pokemon_v2_pokemon(limit: ${pagesize}, offset: ${(pagenum * pagesize)}, where: {is_default: {_eq: true}}, order_by: {${filter}}) {
              name
              id
              pokemon_v2_pokemontypes {
                pokemon_v2_type {
                  name
                }
              }
            }
          }
        `}),
    });
    const result = await res.json();

      result.data.pokemon_v2_pokemon.forEach(element => {
        let types: string[] = [];
        element.pokemon_v2_pokemontypes.forEach(type => {
            types.push(type.pokemon_v2_type.name);
        });
        let pm: PokemonSummary = {
            id: element.id,
            name: element.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${element.id}`,
            type: types,
        };

        arrayOfPokemon.push(pm);
      });

        
    return arrayOfPokemon;

}


async function getPokemon(id: number): Promise<PokemonDetail>{
    let returnPokemon: PokemonDetail = {};

    const res = await fetch('https://beta.pokeapi.co/graphql/v1beta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({query: `
        query samplePokeAPIquery {
            pokemon_v2_pokemon(where: {id: {_eq: ${id}}, is_default:{_eq: true}}) {
              name
              id
              pokemon_v2_pokemonstats {
                base_stat
                pokemon_v2_stat {
                  name
                }
              }
              pokemon_v2_pokemontypes {
                pokemon_v2_type {
                  name
                }
              }
              height
              weight
            }
          }
        `}),
    });

    const result = await res.json();
    
    result.data.pokemon_v2_pokemon.forEach((el) => {
      let types: string[] = [];
      el.pokemon_v2_pokemontypes.forEach(type => {
          types.push(type.pokemon_v2_type.name);
      });
      returnPokemon.name = el.name;
      returnPokemon.id = el.id;
      returnPokemon.sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${el.id}`;
      returnPokemon.type = types;
      returnPokemon.height = el.height;
      returnPokemon.weight = el.weight;
      returnPokemon.stats = {};
      el.pokemon_v2_pokemonstats.forEach((stat) => {
          switch(stat.pokemon_v2_stat.name){
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

    return returnPokemon;
}

let aop = getAllPokemon();
aop.then((res) => console.log(res));

// let testvar = getPokemon(1);
// testvar.then((res) => console.log(res));