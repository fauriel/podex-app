import { Pipe, PipeTransform } from '@angular/core';
import { IPokemon } from '../models/pokemon.model';
import { IStat } from '../models/stat.model';

@Pipe({
  name: 'getStat'
})
export class GetStatPipe implements PipeTransform {

  transform(pokemon: IPokemon, nameStat: string): number {
    const statFound = pokemon.stats.find((stat: IStat) =>
      stat.name == nameStat
    )
    if(statFound){
      return statFound.base_stat
    }
    return 0;

  }

}
