// import { TestBed } from '@angular/core/testing';
// import { AppComponent } from './app.component';

// describe('AppComponent', () => {
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [AppComponent],
//     }).compileComponents();
//   });

//   it('should create the app', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.componentInstance;
//     expect(app).toBeTruthy();
//   });

//   it(`should have the 'taskManager' title`, () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.componentInstance;
//     expect(app.title).toEqual('taskManager');
//   });

//   it('should render title', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.detectChanges();
//     const compiled = fixture.nativeElement as HTMLElement;
//     expect(compiled.querySelector('h1')?.textContent).toContain('Hello, taskManager');
//   });
// });
import { TestBed } from '@angular/core/testing';
   import { AppComponent } from './app.component';
   import { RouterTestingModule } from '@angular/router/testing';
   import { AuthService } from './services/auth.service';

   describe('AppComponent', () => {
     beforeEach(async () => {
       await TestBed.configureTestingModule({
         imports: [AppComponent, RouterTestingModule],
         providers: [AuthService]
       }).compileComponents();
     });

     it('should create the app', () => {
       const fixture = TestBed.createComponent(AppComponent);
       const app = fixture.componentInstance;
       expect(app).toBeTruthy();
     });

     // Remove or update the title-related tests if they're no longer applicable

     it('should have a logout method', () => {
       const fixture = TestBed.createComponent(AppComponent);
       const app = fixture.componentInstance;
       expect(app.logout).toBeDefined();
     });
   });