import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  LoadingController,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonText,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/angular/standalone';
import { PokemonService } from 'src/app/services/pokemon.service';
import { IPokemon } from 'src/app/models/pokemon.model';
import {
  InfiniteScrollCustomEvent,
  IonInfiniteScrollCustomEvent,
} from '@ionic/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.page.html',
  styleUrls: ['./list-pokemons.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonText,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  ],
})
export class ListPokemonsPage {
  private pokemonService: PokemonService = inject(PokemonService);
  private loadingController: LoadingController = inject(LoadingController);

  public pokemons: IPokemon[] = [];
  private router = inject(Router)

  ionViewWillEnter() {
    this.morePokemon();
  }

  async morePokemon(event?: InfiniteScrollCustomEvent) {
    const promisePokemons = this.pokemonService.getPokemons();
    let loading: any
    if (promisePokemons) {
      if (!event) {
         loading = await this.loadingController.create({
          message: 'Cargando...',
        });
        loading.present();
      }

      promisePokemons
        .then((pokemons: IPokemon[]) => {
          console.log(pokemons);
          this.pokemons = this.pokemons.concat(pokemons);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          loading?.dismiss();
          event?.target.complete;
        });
    }else{
      event?.target.complete()
    }
  }

  gotoDetail(pokemon: IPokemon){
    this.router.navigate([
      'detail-pokemon', pokemon.id
    ])
  }
}
