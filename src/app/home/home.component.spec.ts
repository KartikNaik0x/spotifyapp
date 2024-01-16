import { ComponentFixture, TestBed,fakeAsync, tick } from '@angular/core/testing';
import { SpotifyService } from '../spotify.service';
import { WishlistService } from '../wishlist.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HomeComponent } from './home.component';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let spotifyService: SpotifyService;
  let wishlistService: WishlistService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientTestingModule,FormsModule],
      providers: [SpotifyService, WishlistService],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    spotifyService = TestBed.inject(SpotifyService);
    wishlistService = TestBed.inject(WishlistService);
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should fetch tracks on initialization', fakeAsync(() => {
    const searchTracksSpy = spyOn(spotifyService, 'searchTracks').and.returnValue(
      of({
        tracks: {
          items: [
            { id: '1', name: 'Track 1' },
            { id: '2', name: 'Track 2' },
          ],
        },
      })
    );
    component.ngOnInit();
    tick();
    expect(searchTracksSpy).toHaveBeenCalledWith('arijit singh');
    expect(component.tracks?.length).toBe(2); // Use ?. for optional property
  }));
 
  it('should search tracks', fakeAsync(() => {
    const searchTracksSpy = spyOn(spotifyService, 'searchTracks').and.returnValue(
      of({
        tracks: {
          items: [
            { id: '1', name: 'Track 1' },
            { id: '2', name: 'Track 2' },
          ],
        },
      })
    );
    component.searchQuery = 'new search';
    component.search();
    tick();
    expect(searchTracksSpy).toHaveBeenCalledWith('new search');
    expect(component.tracks?.length).toBe(2); // Use ?. for optional property
  }));
  it('should toggle heart', () => {
    const addToWishlistSpy = spyOn(wishlistService, 'addToWishlist');
    const logSpy = spyOn(console, 'log');
    const track = { id: '1', name: 'Track 1', hearted: false };
    component.toggleHeart(track);
    expect(track.hearted).toBe(true);
    expect(addToWishlistSpy).toHaveBeenCalledWith(track);
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify(track, null, 2));
  });
 
  it('should update progress bar', () => {
    const audioElement: any = { currentTime: 10, duration: 30 };
    spyOn(document, 'getElementById').and.returnValue(audioElement);
    component.updateProgressBar('1');
    expect(component.currentTime).toBe(10);
    expect(component.duration).toBe(30);
  });
});