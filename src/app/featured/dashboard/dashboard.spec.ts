import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIcon } from '@angular/material/icon';
import { Dashboard } from './dashboard';
import { MatDrawerContainer } from '@angular/material/sidenav';
import { MatDrawer } from '@angular/material/sidenav';
import { MatNavList } from '@angular/material/list';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatToolbarModule,
        RouterTestingModule,
        MatIcon,
        MatDrawerContainer,
        MatDrawer,
        MatNavList,
      ],
      declarations: [Dashboard],
    }).compileComponents();
    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
