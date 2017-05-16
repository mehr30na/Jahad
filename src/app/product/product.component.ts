import { Component, OnInit } from '@angular/core';
import {Product} from "./product";
import {ProductService} from "./product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

  pro=new Product();
  products:Array<Product>;
  private showLoader: boolean;

  constructor(private productService:ProductService) { }

  ngOnInit(){
    this.showLoader = true;
    this.productService.getProducts().subscribe(res=>{
      this.products = res;
      this.showLoader = false;
    });
  }

  deleteTownShip(id){
    this.showLoader = true;
    if(confirm('آیا از حذف اطمینان دارید؟')) {
      this.productService.deleteProduct(id).subscribe(res=> {
        this.products = res;
        this.showLoader = false;
      });
    }
  }

}
