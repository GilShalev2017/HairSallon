import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Color, Job, JobType, Treatment } from '../models/models';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-add-treatment',
  templateUrl: './add-treatment.component.html',
  styleUrl: './add-treatment.component.css'
})
export class AddTreatmentComponent implements OnInit {
  displayedColumns = ['jobType', 'price','actions']; 
  footerDisplayedColumns= ['jobType', 'price'];
  dataSource = new MatTableDataSource<Job>();
  treatment: Treatment = {
    date: this.formatDate(new Date()),
    remark: '',
    totalPrice: 0,
    jobs: [],
  };
  jobTypes = [
    { name: JobType.ManHairCut, defaultPrice: 50 },
    { name: JobType.ChildHairCut, defaultPrice: 40 },
    { name: JobType.WomanHairCutShort, defaultPrice: 80 },
    { name: JobType.WomanHairCutLong, defaultPrice: 100 },
    { name: JobType.HairDyeing, defaultPrice: 200 },
    { name: JobType.HighlightsFull, defaultPrice: 300 },
    { name: JobType.HighlightsHalf, defaultPrice: 200 },
    { name: JobType.HairStraighteningFull, defaultPrice: 250 },
    { name: JobType.HairStraighteningRoot, defaultPrice: 180 },
  ];
  currentEditedJob: Job = { jobType: '', price: 0, colors: [] };
  showActions: boolean = true;

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
        this.addColorToCurrentJob(); // Open default editor
      }
    }
  }
  addJob() {
    this.treatment.jobs.push({ ...this.currentEditedJob });
    this.updateTableDataSource();
    this.calculateTotalPrice();
    this.currentEditedJob = { jobType: '', price: 0, colors: [] }; // Reset for the next job
  }
  removeJob(index: number) {
    this.treatment.jobs.splice(index, 1);
    this.updateTableDataSource();
    this.calculateTotalPrice();
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
}
