import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Job, JobType, JobTypeItem, Treatment } from '../models/models';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-add-treatment',
  templateUrl: './add-treatment.component.html',
  styleUrls: ['./add-treatment.component.css']
})
export class AddTreatmentComponent implements OnInit {
  displayedColumns = ['jobType', 'price', 'actions'];
  footerDisplayedColumns = ['jobType', 'price'];
  dataSource = new MatTableDataSource<Job>();
  treatment: Treatment = {
    date: this.formatDate(new Date()),
    remark: '',
    totalPrice: 0,
    jobs: [],
  };
  jobTypes: JobTypeItem[] = [
    { name: JobType.ManHairCut, defaultPrice: 100 },
    { name: JobType.ChildHairCut, defaultPrice: 80 },
    { name: JobType.WomanHairCutShort, defaultPrice: 150 },
    { name: JobType.WomanHairCutLong, defaultPrice: 250 },
    { name: JobType.WomanFaceFrame, defaultPrice: 150 },
    { name: JobType.BlowDry, defaultPrice: 120 },
    { name: JobType.HairDyeing, defaultPrice: 400 },
    { name: JobType.HighlightsFull, defaultPrice: 800 },
    { name: JobType.HighlightsHalf, defaultPrice: 450 },
    { name: JobType.HairStraighteningFull, defaultPrice: 900 },
    { name: JobType.HairStraighteningRoot, defaultPrice: 450 },
  ];
  currentEditedJob: Job = { jobType: '', price: 0, colors: [], description: '' };
  showActions: boolean = true;
  addedJobTypes: string[] = [];

  constructor(private dialogRef: MatDialogRef<AddTreatmentComponent>) { }

  ngOnInit() {
    this.dataSource.data = this.treatment.jobs;
  }

  isHairDyeing(): boolean {
    return this.currentEditedJob.jobType === JobType.HairDyeing;
  }

  onJobTypeChange(jobType: JobType) {
    const selectedJob = this.jobTypes.find(j => j.name === jobType);
    if (selectedJob) {
      this.currentEditedJob.price = selectedJob.defaultPrice;
      if (jobType === JobType.HairDyeing && !this.currentEditedJob.colors?.length) {
        this.addColorToCurrentJob(); // Open default editor for colors if it's HairDyeing
      }
      if (!this.addedJobTypes.includes(jobType)) {
        this.addedJobTypes.push(jobType); // Track added job types
      }
    }
  }

  isJobTypeAdded(jobTypeItem: JobTypeItem): boolean {
    return this.addedJobTypes.includes(jobTypeItem.name);
  }
  addJob() {
    // Before adding the job, we remove empty color rows
    this.removeEmptyColorRows();
    // Find the JobTypeItem corresponding to currentEditedJob.jobType
    const jobTypeItem = this.jobTypes.find(j => j.name === this.currentEditedJob.jobType);
    // Check if the jobTypeItem exists and if the job type has been added
    if (jobTypeItem && this.isJobTypeAdded(jobTypeItem)) {
      // Add the currentEditedJob to the treatment.jobs array
      this.treatment.jobs.push({ ...this.currentEditedJob });
      // Update the table data source
      this.updateTableDataSource();
      // Recalculate the total price
      this.calculateTotalPrice();
      // Reset currentEditedJob for the next job
      this.currentEditedJob = { jobType: '', price: 0, colors: [], description: '' };
    } else {
      // Handle the case where the job type is not added or jobTypeItem is undefined
      console.error('Job type is not added or invalid.');
    }
  }
  removeJob(index: number) {
    // Remove the job from jobs array and from addedJobTypes
    const removedJob = this.treatment.jobs[index];
    this.treatment.jobs.splice(index, 1);
    this.updateTableDataSource();
    this.calculateTotalPrice();

    // Also remove from addedJobTypes
    const indexInAddedJobTypes = this.addedJobTypes.indexOf(removedJob.jobType);
    if (indexInAddedJobTypes !== -1) {
      this.addedJobTypes.splice(indexInAddedJobTypes, 1); // Remove job type from addedJobTypes
    }
  }

  addColorToCurrentJob() {
    if (!this.currentEditedJob.colors) {
      this.currentEditedJob.colors = [];
    }
    this.currentEditedJob.colors.push({ colorNumber: '', colorAmount: 0 });
  }

  updateTableDataSource() {
    this.dataSource.data = [...this.treatment.jobs];
  }

  calculateTotalPrice() {
    this.treatment.totalPrice = this.treatment.jobs.reduce((sum, job) => sum + job.price, 0);
  }

  onSaveTreatment() {
    this.dialogRef.close(this.treatment);
  }

  onCancel() {
    this.dialogRef.close();
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Remove empty color rows before saving
  removeEmptyColorRows(): void {
    this.currentEditedJob.colors = this.currentEditedJob.colors?.filter(color =>
      color.colorNumber && color.colorAmount
    );
  }

  isColorValid(): boolean {
    const color = this.currentEditedJob.colors?.[this.currentEditedJob.colors.length - 1];
    return color ? !!(color.colorNumber && color.colorAmount) : false;
  }
}
