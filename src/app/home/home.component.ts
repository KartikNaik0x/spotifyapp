import { Component} from '@angular/core';
import { SpotifyService } from '../spotify.service';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  searchQuery:string="";
  tracks :any[]=[];
  currentTime:number=0;
  duration:number=0;
 

  constructor(private spotifyService: SpotifyService, private wishlistService: WishlistService){}

  ngOnInit(): void {
    // Make the initial API call when the component is initialized
    this.spotifyService.searchTracks('arijit singh').subscribe(
      (data: any) => {
        this.tracks = data.tracks.items;
      },
      (error) => {
        console.log("Error fetching tracks");
      }
    );
  }

 


  currentlyPlayingId: string | null = null;
  playingTrack: any;


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

  search():void{
    this.spotifyService.searchTracks(this.searchQuery).subscribe(
      (data:any)=>{
        this.pauseCurrentlyPlayingAudio();    
        // console.log(data);
        this.tracks=data.tracks.items;
      },
      (error)=>{
        this.pauseCurrentlyPlayingAudio();    
        // console.log("Error fetching tracks");
      }
    )
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

  toggleHeart(result: any): void {
    result.hearted = !result.hearted;
    if (result.hearted) {
      // If hearted, log the JSON data of the card
      this.wishlistService.addToWishlist(result);
      console.log(JSON.stringify(result, null, 2));
    }
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


