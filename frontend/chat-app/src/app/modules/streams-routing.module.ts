import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentsComponent } from '../components/comments/comments.component';
import { PeopleComponent } from '../components/people/people.component';
import { StreamsComponent } from '../components/streams/streams.component';
import { AuthGuard } from '../guard/auth.guard';


const routes : Routes = [
  {
    path:'streams',
    component: StreamsComponent,
    canActivate: [AuthGuard]
  },

  {
    path:'post/:id',
    component: CommentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'people',
    component: PeopleComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class StreamsRoutingModule { }
