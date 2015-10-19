package com.boki.hibernate.test;

import java.util.List;

import org.hibernate.Session;

import com.boki.hibernate.bean.Clazz;
import com.boki.hibernate.bean.Student;
import com.boki.hibernate.util.HibernateSessionFactory;

public class TestAnnotationedClazzStudent {

	@SuppressWarnings("all")
	public static void main(String[] args) throws Exception {

		Clazz clazz = new Clazz();
		clazz.setName("三年二班");

		Student student1 = new Student();
		student1.setName("周周");
		student1.setSex("男");

		Student student2 = new Student();
		student2.setName("李四");
		student2.setSex("女");

		Session session = HibernateSessionFactory.getSession();
		session.beginTransaction();

		// 儲存進資料庫
		session.persist(clazz);
		session.persist(student1);
		session.persist(student2);

		// 設定班級
		student1.setClazz(clazz);
		student2.setClazz(clazz);
		// clazz.getStudents().add(student1);
		// clazz.getStudents().add(student2);

		session.getTransaction().commit();
		session.close();

		session = HibernateSessionFactory.getSession();
		session.beginTransaction();

		// 查詢名為「三年二班」的班級 然後輸出學生
		Clazz c = (Clazz) session.createQuery(
				" select c from Clazz c where c.name = :name ").setParameter(
				"name", "三年二班").uniqueResult();

		System.out.println("三年二班 的所有學生：");
		for (Student s : c.getStudents()) {
			System.out.println("\t姓名：" + s.getName() + ", 性別：" + s.getSex());
		}

		// 直接查詢班級為「三年二班」的學生
		List<Student> students = session.createQuery(
				" select s from Student s where s.clazz.name = :name ")
				.setParameter("name", "三年二班").list();

		System.out.println("三年二班 的所有學生：");
		for (Student s : students) {
			System.out.println("\t姓名：" + s.getName() + ", 性別：" + s.getSex());
		}

		session.getTransaction().commit();
		session.close();

	}

}
