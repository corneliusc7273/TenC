import { db } from "$lib/server/db";

export function load() {
    const students = db.query('SELECT * FROM students').all();
    const payments = db.query(`
        SELECT payments.*, students.name 
        FROM payments 
        JOIN students ON payments.student_id = students.id
    `).all();
    const expenses = db.query('SELECT * FROM expenses').all();
    const studentTotals = db.query(`
    SELECT 
        students.id,
        students.name,
        COALESCE(SUM(payments.amount), 0) AS total_paid
    FROM students
    LEFT JOIN payments ON students.id = payments.student_id
    GROUP BY students.id
    `).all();
    const totalIncome = db.query('SELECT COALESCE(SUM(amount), 0) AS total FROM payments').get().total;
    const totalExpense  = db.query('SELECT COALESCE(SUM(amount), 0) AS total FROM expenses').get().total;
    const latestPayments = db.query(`
    SELECT payments.*, students.name 
    FROM payments 
    JOIN students ON payments.student_id = students.id
    ORDER BY payments.timestamp DESC, payments.id DESC
    LIMIT 5
  `).all();
    console.log(totalIncome);

    return { students, payments, expenses, studentTotals, totalIncome, latestPayments };
}

