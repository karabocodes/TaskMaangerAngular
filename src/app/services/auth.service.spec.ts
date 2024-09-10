import { TestBed } from '@angular/core/testing';
   import { AuthGuard } from '../guards/auth.guard';
   import { RouterTestingModule } from '@angular/router/testing';

   describe('AuthGuard', () => {
     let guard: AuthGuard;

     beforeEach(() => {
       TestBed.configureTestingModule({
         imports: [RouterTestingModule],
         providers: [AuthGuard]
       });
       guard = TestBed.inject(AuthGuard);
     });

     it('should be created', () => {
       expect(guard).toBeTruthy();
     });

   });