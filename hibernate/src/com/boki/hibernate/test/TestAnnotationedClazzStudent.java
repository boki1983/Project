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
		clazz.setName("�T�~�G�Z");

		Student student1 = new Student();
		student1.setName("�P�P");
		student1.setSex("�k");

		Student student2 = new Student();
		student2.setName("���|");
		student2.setSex("�k");

		Session session = HibernateSessionFactory.getSession();
		session.beginTransaction();

		// �x�s�i��Ʈw
		session.persist(clazz);
		session.persist(student1);
		session.persist(student2);

		// �]�w�Z��
		student1.setClazz(clazz);
		student2.setClazz(clazz);
		// clazz.getStudents().add(student1);
		// clazz.getStudents().add(student2);

		session.getTransaction().commit();
		session.close();

		session = HibernateSessionFactory.getSession();
		session.beginTransaction();

		// �d�ߦW���u�T�~�G�Z�v���Z�� �M���X�ǥ�
		Clazz c = (Clazz) session.createQuery(
				" select c from Clazz c where c.name = :name ").setParameter(
				"name", "�T�~�G�Z").uniqueResult();

		System.out.println("�T�~�G�Z ���Ҧ��ǥ͡G");
		for (Student s : c.getStudents()) {
			System.out.println("\t�m�W�G" + s.getName() + ", �ʧO�G" + s.getSex());
		}

		// �����d�߯Z�Ŭ��u�T�~�G�Z�v���ǥ�
		List<Student> students = session.createQuery(
				" select s from Student s where s.clazz.name = :name ")
				.setParameter("name", "�T�~�G�Z").list();

		System.out.println("�T�~�G�Z ���Ҧ��ǥ͡G");
		for (Student s : students) {
			System.out.println("\t�m�W�G" + s.getName() + ", �ʧO�G" + s.getSex());
		}

		session.getTransaction().commit();
		session.close();

	}

}
