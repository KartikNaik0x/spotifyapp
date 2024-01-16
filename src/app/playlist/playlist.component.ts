import { Component } from '@angular/core';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent {

  playlist: any[] = [];
  username:String|any;
  currentlyPlayingId: string | null = null;
  playingTrack: any;
  currentTime:number=0;
  duration:number=0;

  constructor(private wishlistService: WishlistService) {}
  
  ngOnInit(): void {
     
    this.username = localStorage.getItem('username');
    // Make the initial API call to fetch playlist data
    this.wishlistService.getPlaylist(this.username).subscribe(
      (data: any) => {
        // console.log(data);
        this.playlist = data; // Assuming data is an array of playlist items
      },
      (error) => {
        // console.log('Error fetching playlist');
      }
    );
  }



  playAudio(result: any) {
    const audioElement = document.getElementById('audio' + result.id) as HTMLAudioElement;
    if (this.currentlyPlayingId !== result.id) {
      // Pause any currently playing audio
      if (this.currentlyPlayingId) {
        const currentlyPlayingAudio = document.getElementById('audio' + this.currentlyPlayingId) as HTMLAudioElement;
       
        currentlyPlayingAudio?.pause();
      }
      // Play the selected audio
      audioElement.play();
      this.currentlyPlayingId = result.id;
    } else {
      // Toggle play/pause for the same audio
      if (audioElement.paused) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    }
    audioElement.addEventListener('ended', () => {
      // Reset currentlyPlayingId when audio ends
      this.currentlyPlayingId = null;
    });
  }

  

  pauseCurrentlyPlayingAudio() {
    if (this.currentlyPlayingId) {
      const currentlyPlayingAudio = document.getElementById('audio' + this.currentlyPlayingId) as HTMLAudioElement;
      currentlyPlayingAudio.pause();
    }
  }
  isAudioPaused(id: string): boolean {
    const audioElement = document.getElementById('audio' + id) as HTMLAudioElement;
    return audioElement.paused;
  }

  calculateProgressBarWidth(id: string): number {
    const audioElement = document.getElementById('audio' + id) as HTMLAudioElement;
    if (!audioElement) {
      return 0;
    }
    const { currentTime, duration } = audioElement;
    return (currentTime / duration) * 100;
  }
  // Add a method to update progress bar during time updates
  updateProgressBar(id: string): void {
    const audioElement = document.getElementById('audio' + id) as HTMLAudioElement;
    if (!audioElement) {
      return;
    }
    this.currentTime = audioElement.currentTime;
    this.duration = audioElement.duration;
  }
  
 
  
  
  
  
  
  
}
