import { Routes } from '@angular/router';
import { LandingPageComponent } from './common/landing-page/landing-page.component';
import { MainPageComponent } from './common/main-page/main-page.component';
import { AddProductComponent } from './common/add-product/add-product.component';
import { ProductComponent } from './common/product/product.component';
import { HomeComponent } from './common/home/home.component';
import { RegisterComponent } from './common/register/register.component';
import { LoignComponent } from './common/loign/loign.component';
import { OrdersComponent } from './common/orders/orders.component';
import { CartComponent } from './common/cart/cart.component';
import { AdminComponent } from './common/admin/admin.component';
import { BkWallComponent } from './common/bk-wall/bk-wall.component';


export const routes: Routes = [
    {
        path: '', component: LandingPageComponent, children: [
            { path: '', component: MainPageComponent },
            { path: "food/:id", component: ProductComponent },
            { path: "add", component: AddProductComponent },
            { path: "home", component: HomeComponent },
            { path: "register", component: RegisterComponent },
            { path: "login", component: LoignComponent },
            { path: 'orders', component: OrdersComponent },
            { path: 'cart', component: CartComponent },
            { path: 'admin', component: AdminComponent },
            { path: 'bk-wall', component: BkWallComponent}











        ]
    },
];
