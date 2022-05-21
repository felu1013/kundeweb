import { HeaderComponent } from './header.component';
import { LoginLogoutComponent } from './login-logout.component';
import { LogoComponent } from './logo.component';
import { NavComponent } from './nav.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    declarations: [
        HeaderComponent,
        LoginLogoutComponent,
        LogoComponent,
        NavComponent,
    ],
    exports: [HeaderComponent],
})
export class HeaderModule {}
