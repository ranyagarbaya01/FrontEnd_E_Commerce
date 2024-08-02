import { Component } from '@angular/core';
import { Brand } from '../../shared/models/product';
import { ShopService } from '../../shop/shop.service';

@Component({
  selector: 'app-list-famille',
  templateUrl: './list-famille.component.html',
  styleUrls: ['./list-famille.component.scss']
})
export class ListFamilleComponent {

  familles: Brand[] = [];
  search: string = '';
  filteredFamilles : Brand[] = [];

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getFamilles(); 
  }

  getFamilles(): void {
    this.shopService.getBrands().subscribe({
      next: (response) => {
        this.familles = response;
        this.onSearchChanges();
      },
      error: (error) => console.error(error)
    });
  }

  filterBySearch(famille: Brand): boolean {
    const searchLower = this.search.toLowerCase();
    return (
      famille.id.toString().includes(searchLower) ||
      famille.name.toLowerCase().includes(searchLower) 
     
    );
  }

  
  onSearchChanges() {
    this.filteredFamilles = this.familles.filter(famille =>
      this.filterBySearch(famille) 
      // this.filterByPrixTTC(product) &&
      // this.filterByPrixBarre(product)
    );}


  onSearchChange(searchValue: string): void {
    this.search = searchValue;
    this.getFamilles();
  }

  deleteFamille(id: number) {
    this.shopService.deleteBrand(id).subscribe({
      next: () => {
        this.getFamilles(); 
      },
      error: (error) => console.log(error)
    });
  }

}
