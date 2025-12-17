import { ChangeDetectionStrategy, Component, computed,  inject,  ViewEncapsulation } from '@angular/core';
import Blank from '../../components/blank';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { FlexiToastService } from 'flexi-toast';
import { HttpClient } from '@angular/common/http';



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
  TooltipModule,
  RouterLink

  
  ],
  templateUrl: './products.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Products {
 readonly result = httpResource<ProductModel[]>(() => "http://localhost:3000/products");
 readonly data = computed(()=>this.result.value()?? [])  ;
 readonly loading = computed(()=> this.result.isLoading()) 
readonly #toast= inject(FlexiToastService) 
readonly #http = inject(HttpClient);

 delete(id: string) {
    this.#toast.showSwal("Ürünü sil?", "Ürünü silmek istiyor musunuz?", "Sil", () => {
      // 2. ADIM: Gelen 'id'yi burada kullanıyoruz (Böylece ESLint hatası giderilir)
      this.#http.delete(`http://localhost:3000/products/${id}`).subscribe(() => {
        this.#toast.showToast("Silindi", "Ürün başarıyla silindi", "info");
        this.result.reload(); // Listeyi yeniler
      });
    });
  }
}
