import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-botpress-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './botpresschat.html'
})
export class BotpresschatComponent implements OnInit {

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {

    // Inject Script 1
    const script1 = this.renderer.createElement('script');
    script1.src = 'https://cdn.botpress.cloud/webchat/v2.2/inject.js';
    script1.async = true;

    // When script1 loads, initialize Botpress
    script1.onload = () => {
      if ((window as any).botpressWebChat) {
        (window as any).botpressWebChat.init({
          botId: "de44be2c-3d50-4adb-a5d1-94ac064a7381",
          host: "https://cdn.botpress.cloud/webchat",
          stylesheet: "https://your-custom-style.css",
          theme: {
            color: "#0066ff",
            background: "#ffffff",
            fontColor: "#000000"
          },
          useSessionStorage: true
        });
      }
    };

    this.renderer.appendChild(document.body, script1);

    // Inject Script 2
    const script2 = this.renderer.createElement('script');
    script2.src = 'https://files.bpcontent.cloud/2025/01/30/11/20250130110557-KVB0O0BH.js';
    script2.async = true;
    this.renderer.appendChild(document.body, script2);
  }
}
