import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { NgxMicRecorderService } from 'ngx-mic-recorder';
import WaveSurfer from 'wavesurfer.js'

@Component({
  selector: 'app-audio-recorder',
  standalone: false,
  templateUrl: './audio-recorder.component.html',
  styleUrl: './audio-recorder.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class AudioRecorderComponent implements OnInit {
  ngxMicRecorderService = inject(NgxMicRecorderService);
  recordingTime: string = '';
  audioUrl: string = '';
  isRecordingCompleted: boolean = false;
  wavesurferRef: any;

  ngOnInit(): void {
    this.invokeMicRecorderServices();
  }

  invokeMicRecorderServices() {
    this.ngxMicRecorderService.recordingTime$.subscribe({
      next: (recording: string) => {
        console.log(recording)
        this.recordingTime = recording
        if (this.recordingTime === '00:00:30') {
          this.ngxMicRecorderService.stopRecording();
        }
      }
    })

    this.ngxMicRecorderService.recordedBlob$.subscribe({
      next: (response: any) => {
        console.log(response)
        if (response) {
          this.audioUrl = URL.createObjectURL(response);
          this.isRecordingCompleted = true;
          this.createWaveSurfer();
        }

      }
    })
  }

  createWaveSurfer() {
    console.log('wavesurfer')
    this.wavesurferRef = WaveSurfer.create({
      container: '#waveform',
      url: this.audioUrl,
      height: 200,
      width: 'auto',
      mediaControls: true
    })
  }



  play() {
    this.wavesurferRef.play();
  }

  discardRecording() {

  }
}
