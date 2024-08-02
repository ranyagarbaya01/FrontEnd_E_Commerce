import { Component } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { BasketItem } from 'src/app/shared/models/basket';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  currentUser: User | null = null;

  constructor(public basketService: BasketService, public accountService: AccountService) {
    this.accountService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  getCount(items: BasketItem[]) {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }

  isUserAdmin(): boolean {
    return this.currentUser?.type === 1;
  }

  isUserLoggedIn(): boolean {
    return this.currentUser !== null;
  }
}



// import { Component } from '@angular/core';
// import { AccountService } from 'src/app/account/account.service';
// import { BasketService } from 'src/app/basket/basket.service';
// import { BasketItem } from 'src/app/shared/models/basket';

// @Component({
//   selector: 'app-nav-bar',
//   templateUrl: './nav-bar.component.html',
//   styleUrls: ['./nav-bar.component.scss']
// })
// export class NavBarComponent {

//   constructor(public basketService: BasketService, public accountService: AccountService) {}

//   getCount(items: BasketItem[]) {
//     return items.reduce((sum, item) => sum + item.quantity, 0);
//   }
// }
