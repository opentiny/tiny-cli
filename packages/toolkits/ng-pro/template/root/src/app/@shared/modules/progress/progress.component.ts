import {
  Component,
  ContentChild,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef
} from '@angular/core';

@Component({
  selector: 't-pro-base-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  preserveWhitespaces: false,
})
export class TProBaseProgressComponent implements OnInit , OnChanges {
  @Input() percentage = 0;
  @Input() percentageText: string;
  @Input() strokeColor: string;
  @Input() strokeWidth = 14; // 进度条的线条宽度
  @Input() type: 'line' | 'circle' = 'line';
  @Input() showContent = true;
  @ContentChild(TemplateRef) customViewTemplate: TemplateRef<any>;
  trailPath: { [key: string]: string };
  strokePath: { [key: string]: string };
  pathString: string;

  constructor() {

  }

  ngOnInit(): void {
    if (this.type === 'circle') {
      this.setCircleProgress();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.type === 'circle') {
      this.setCircleProgress();
    }
  }

  setCircleProgress(): void {
    if (this.type !== 'circle') {
      return;
    }
    const radius = 50 - this.strokeWidth / 2;
    const beginPositionY = -radius;
    const endPositionY = radius * -2;

    this.pathString = `M 50,50 m 0,${beginPositionY}
     a ${radius},${radius} 0 1 1 0,${-endPositionY}
     a ${radius},${radius} 0 1 1 0,${endPositionY}`;

    const len = Math.PI * 2 * radius;

    this.trailPath = {
      strokeDasharray: `${len}px ${len}px`,
      strokeDashoffset: `0`,
      transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s'
    };
    this.strokePath = {
      stroke: this.strokeColor || (null as any),
      strokeDasharray: `${(this.percentage / 100) * len }px ${len}px`,
      strokeDashoffset: `0`,
      transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s'
    };
  }
}
