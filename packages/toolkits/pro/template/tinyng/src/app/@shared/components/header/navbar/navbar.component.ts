import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ConnectedPosition } from '@angular/cdk/overlay';

export type AppendToBodyDirection = 'rightDown' | 'rightUp' | 'leftUp' | 'leftDown' | 'centerDown' | 'centerUp';

@Component({
  selector: 't-pro-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @Input() data: any[];

  _mode: 'left' | 'top' = 'top';
  @Input() set mode(mode) {
    this._mode = mode;
    this.refreshDataAndView();
  }

  get mode() {
    return this._mode;
  }

  @HostListener('window:resize')
  onResize() {
    this.refreshDataAndView();
  }

  dropdownDirections: {
    [key: string]: (AppendToBodyDirection | ConnectedPosition)[];
  } = {
    left: [
      {
        originX: 'end',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'top',
      },
    ],
    top: ['rightDown'],
  };

  subMenuDirections: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: -4,
    },
  ];

  elementsState: {
    width: number;
    height: number;
    offsetLeft: number;
    offsetTop: number;
  }[] = [];

  packData: any[] = [];
  packItemsActive = false;

  get showTitle(): boolean {
    return this.mode === 'top';
  }

  currentUrl: string;

  constructor(private elementRef: ElementRef, private router: Router, private renderer: Renderer2) {
    this.currentUrl = this.router.url;
  }

  refreshDataAndView() {
    if (this.mode !== 'top') {
      return;
    }

    const parentWidth = this.elementRef.nativeElement.offsetWidth;

    const itemElements = this.elementRef.nativeElement.querySelectorAll('.t-pro-nav-item');
    itemElements.forEach((element: any, i: number) => {
      if (!this.elementsState[i] && element.offsetLeft > 0) {
        this.elementsState[i] = {
          width: element.offsetWidth,
          height: element.offsetHeight,
          offsetLeft: element.offsetLeft,
          offsetTop: element.offsetTop,
        };
      }
    });

    this.packData = [];
    this.packItemsActive = false;
    itemElements.forEach((element: any, i: number) => {
      if (this.elementsState[i] && this.elementsState[i].width + this.elementsState[i].offsetLeft > parentWidth - 40) {
        this.packData.push(this.data[i]);

        if (this.currentUrl.indexOf(this.data[i].link) !== -1) {
          this.packItemsActive = true;
        }

        this.renderer.addClass(element, 't-pro-menu-hidden');
      } else {
        this.renderer.removeClass(element, 't-pro-menu-hidden');
      }
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects;
        this.packItemsActive = false;
        this.packData.forEach((item) => {
          if (this.currentUrl.indexOf(item.link) !== -1) {
            this.packItemsActive = true;
          }
        });
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.refreshDataAndView(); // TODO: 解决时间周期问题
    });
  }
}
