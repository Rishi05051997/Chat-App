import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentsComponent } from '../components/comments/comments.component';
import { FollowersComponent } from '../components/followers/followers.component';
import { FollowingComponent } from '../components/following/following.component';
import { NotificationsComponent } from '../components/notifications/notifications.component';
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
  },
  {
    path:'people/following',
    component: FollowingComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'people/following',
    component: FollowingComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'people/followers',
    component: FollowersComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard]
  },

]

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class StreamsRoutingModule { }
