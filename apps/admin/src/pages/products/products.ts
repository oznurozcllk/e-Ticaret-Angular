import { ChangeDetectionStrategy, Component, computed,  ViewEncapsulation } from '@angular/core';
import Blank from '../../components/blank';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { httpResource } from '@angular/common/http';

export interface ProductModel {
id:string;
name:string;
imageUrl:string;
price:number;
stock:number;
categoryId:string;
categoryName: string;
}

@Component({
  imports: [Blank,
  TableModule,
  CommonModule,
  ButtonModule,
  TooltipModule
  ],
  templateUrl: './products.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Products {
 readonly result = httpResource<ProductModel[]>(() => "http://localhost:3000/products");
 readonly data = computed(()=>this.result.value()?? [])  ;
 readonly loading = computed(()=> this.result.isLoading())
}
