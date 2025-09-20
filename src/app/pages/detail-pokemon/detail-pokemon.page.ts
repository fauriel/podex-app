import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, LoadingController,
  IonImg, IonFabButton, IonIcon, IonCard, IonFab, IonCardHeader,
  IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonText, IonProgressBar } from '@ionic/angular/standalone';
import { PokemonService } from 'src/app/services/pokemon.service';
import { IPokemon } from 'src/app/models/pokemon.model';
import { closeOutline} from 'ionicons/icons'
import { addIcons } from 'ionicons';
import {  Router } from '@angular/router';
import { GetStatPipe } from 'src/app/pipes/get-stat-pipe';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.page.html',
  styleUrls: ['./detail-pokemon.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonImg, IonFab,
    IonFabButton, IonIcon, IonCardHeader, IonCardTitle, IonCardHeader,
    IonCardTitle, IonCard, IonCardContent, IonGrid, IonRow, IonCol,
    IonText, GetStatPipe, IonProgressBar
  ],
})
export class DetailPokemonPage {

  private pokemonService: PokemonService = inject(PokemonService);
  private loadingController: LoadingController = inject(LoadingController);
  private router: Router= inject(Router)
  public pokemon!: IPokemon;
  @Input() id!: number;

  public pokemonStats: any[] = [
    {
      name: 'Ps',
      stat: 'hp'
    },
     {
      name: 'Ataque',
      stat: 'attack'
    },
     {
      name: 'Defensa',
      stat: 'defense'
    },
     {
      name: 'At. esp.',
      stat: 'special-attack'
    },
     {
      name: 'Velocidad',
      stat: 'speed'
    },
  ]




  async ionViewWillEnter() {
    console.log(this.id);

    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    loading.present();

    this.pokemonService.getPokemon(this.id).then((pokemon: IPokemon) => {
        this.pokemon = pokemon;
      }).catch((err) => {
        this.goBack()
      })
      .finally(() => {
        loading.dismiss();
      });
  }

  goBack(){
    this.router.navigateByUrl('list-pokemons')

  }

  constructor(){
    addIcons({
      closeOutline
    })
  }

}
