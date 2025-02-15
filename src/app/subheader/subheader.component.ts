import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.scss']
})
export class SubheaderComponent {
  getData: any = []

  constructor(private elRef: ElementRef, private router: Router) { }

  ngOnInit() { }

  exit() {
    window.scrollTo(0, 0);
  }

  RouteToCategoryPage(category: any) {
    // var categoryValue = category;
    // var queryString = '?ctgry=' + encodeURIComponent(categoryValue);
    // var newUrl = `/category/${category}` + queryString;
    // window.location.href = newUrl;

    const category_value = category;
    const category_value_one = category.replace(/\s+/g, '-');
    // const queryParams = { ctgry: categoryValue };
    const search_data = {
      ctgry: category_value,
    };
    this.router.navigate(['/category', category_value_one], { state: { search_data }});
  }

  hoveredCategory: string | null = null;
  hoverTimeout: any;

  onHoverIn(category: string) {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }
    this.hoveredCategory = category;
  }

  onHoverOut(category: string) {
    this.hoverTimeout = setTimeout(() => {
      if (this.hoveredCategory === category) {
        this.hoveredCategory = null;
      }
    }, 400); // 0.4 seconds delay
  }


  selectedOrderIndex: number | null = null;
  toggleOrderDetails(index: number): void {
    if (this.selectedOrderIndex === index) {
      this.selectedOrderIndex = null; // Hide the details if already selected
    } else {
      this.selectedOrderIndex = index; // Show the details of the clicked order
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.selectedOrderIndex = null;
    }
  }

  isOrderDetailsOpen(index: number): boolean {
    return this.selectedOrderIndex === index;
  }

}
