import {Component, OnInit} from "@angular/core";
import {Product} from "./product";
import {Router} from "@angular/router";
import {ProductService} from "./product.service";
declare var swal:any;


@Component({
  selector:'',
  templateUrl:'./addProduct.component.html'
})

export class AddProductComponent implements OnInit{

  newProducts:Array<Product>=[];
  newPro:Product;

  constructor(private router:Router,
              private productService:ProductService) { }

  ngOnInit(){
    this.newPro=new Product();
    this.newProducts.push(this.newPro);
  }

  onChange(value,i){
    this.newProducts[i].title=value;
  }

  newProduct(){
    let newP=new Product();
    this.newProducts.push(newP);
  }

  deleteProduct(i){
    this.newProducts.splice(i,1);
  }

  addProducts(){
    this.productService.addProduct(this.newProducts).subscribe(res=> {
      this.newProducts=res;
      swal(
        'محصول با موفقیت افزوده شد!',
        'لطفا دکمه OK را بزنید',
        'success'
      );
      this.router.navigateByUrl('products');
    });
    this.newProducts=null;
    // for(let i=0;i<this.newTownShips.length;i++){
    //   this.newTownShips.splice(i,1);
    // }
  }

}
