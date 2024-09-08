import { Routes } from '@angular/router';
import { UsuarioDetalleComponent } from './components/usuario-detalle/usuario-detalle.component';
import { NuevoUsuarioComponent } from './components/nuevo-usuario/nuevo-usuario.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsuariosListaComponent } from './components/usuarios-lista/usuarios-lista.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: DashboardComponent, 
        children: [ 
            { path: '', component: UsuariosListaComponent },
            { path: 'newuser', component: NuevoUsuarioComponent },
            { path: 'updateuser/:id', component: NuevoUsuarioComponent }
        ],
    },
    { path: 'user/:id', component: UsuarioDetalleComponent },
];
