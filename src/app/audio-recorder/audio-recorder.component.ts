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
  audioDuration: string = '';
  isRecordingStarted: boolean = false;

  ngOnInit(): void {
    this.invokeMicRecorderServices();
  }

  invokeMicRecorderServices() {
    this.ngxMicRecorderService.isRecording$.subscribe({
      next: (recordingState: boolean) => {
        this.isRecordingStarted = recordingState;
      }
    })
    this.ngxMicRecorderService.recordingTime$.subscribe({
      next: (recording: string) => {
        this.recordingTime = recording
        if (this.recordingTime === '00:00:30') {
          this.ngxMicRecorderService.stopRecording();
        }
      }
    })

    this.ngxMicRecorderService.recordedBlob$.subscribe({
      next: (response: any) => {
        if (response) {
          this.audioUrl = URL.createObjectURL(response);
          this.isRecordingCompleted = true;
          this.createWaveSurfer();
        }
      }
    })
  }

  createWaveSurfer() {
    this.wavesurferRef = WaveSurfer.create({
      container: '#waveform',
      url: this.audioUrl,
      height: 200,
      width: 'auto',
    })
    this.audioDuration = this.wavesurferRef.getDuration();
    this.wavesurferRef.on('ready', (event: number) => {
      this.audioDuration = Math.round(event).toString().padStart(2, '0');
      this.recordingTime = '00';
    })
    this.wavesurferRef.on('audioprocess', (event: any) => {
      this.recordingTime = Math.round(event).toString().padStart(2, '0');
    })
  }

  playPause() {
    this.wavesurferRef.playPause();
  }
  pause() {
    this.wavesurferRef.pause();
  }

  discardRecording() {
    this.recordingTime = '00:00:00';
    this.audioUrl = '';
    this.isRecordingCompleted = false;
    this.wavesurferRef.destroy();
  }
}
