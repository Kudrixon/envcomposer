const request = require('supertest');
const app = require('../src/server');

describe('Semesters API', () => {
  it('should get all semesters', async () => {
    const res = await request(app).get('/semesters');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body.semesters)).toBe(true);
    expect(res.body.semesters).toHaveLength(10);
    res.body.semesters.forEach((semester) => {
      const parsedSemester = JSON.parse(semester);
      expect(parsedSemester.id).toBeDefined();
      expect(parsedSemester.name).toBeDefined();
    });
  });
});

describe('Faculties API', () => {
  it('should get all faculties', async () => {
    const res = await request(app).get('/faculties');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body.faculties)).toBe(true);
    expect(res.body.faculties).toHaveLength(16);
    res.body.faculties.forEach((faculty) => {
      const parsedFaculty = JSON.parse(faculty);
      expect(parsedFaculty.id).toBeDefined();
      expect(parsedFaculty.name).toBeDefined();
    });
  });
});

describe('Lecturers API', () => {
  it('should get all lecturers', async () => {
    const res = await request(app).get('/lecturers');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body.lecturers)).toBe(true);
    res.body.lecturers.forEach((lecturer) => {
      const parsedLecturer = JSON.parse(lecturer);
      expect(parsedLecturer.id).toBeDefined();
      expect(parsedLecturer.name).toBeDefined();
    });
  });
});

describe('Courses API', () => {
  it('should get all courses', async () => {
    const res = await request(app).get('/courses');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body.courses)).toBe(true);
    res.body.courses.forEach((course) => {
      const parsedCourse = JSON.parse(course);
      expect(parsedCourse.id).toBeDefined();
      expect(parsedCourse.name).toBeDefined();
      expect(parsedCourse.semester_id).toBeDefined();
      expect(parsedCourse.lecturer_id).toBeDefined();
    });
  });
});

describe('Courses API', () => {
  it('should get at least one scriptname', async () => {
    const res = await request(app).get('/courses/1/scripts');
    expect(res.statusCode).toEqual(200);

    const responseBody = JSON.parse(res.text);
    const results = JSON.parse(responseBody.results[0]);

    expect(results.scriptname).toBeDefined();
  });
});


describe('Lecturers API', () => {
  it('should get at least 1 lecturer per faculty WIMIP which has id 1', async () => {
    const res = await request(app).get('/lecturers/1');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body.lecturers)).toBe(true);
    res.body.lecturers.forEach((lecturer) => {
      const parsedLecturer = lecturer;
      expect(parsedLecturer.id).toBeDefined();
      expect(parsedLecturer.name).toBeDefined();
    });
  });
});

describe('Lecturers API', () => {
  it('should get at least 1 program for first lecturer on first course', async () => {
    const res = await request(app).get('/lecturers/1/course/1/program');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body.lecturers)).toBe(true);
    res.body.lecturers.forEach((lecturer) => {
      const parsedLecturer = lecturer;
      expect(parsedLecturer.program_name).toBeDefined();
    });
  });
});

describe('Lecturers API', () => {
  it('should get at least 1 program for first lecturer on first course', async () => {
    const res = await request(app).get('/lecturers/1/course/1/program');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body.lecturers)).toBe(true);
    res.body.lecturers.forEach((lecturer) => {
      const parsedLecturer = lecturer;
      expect(parsedLecturer.program_name).toBeDefined();
    });
  });
});
