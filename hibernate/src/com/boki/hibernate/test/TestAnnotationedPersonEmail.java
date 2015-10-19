package com.boki.hibernate.test;

import java.util.List;

import org.hibernate.Session;

import com.boki.hibernate.bean.Email;
import com.boki.hibernate.bean.Person2;
import com.boki.hibernate.util.HibernateSessionFactory;

public class TestAnnotationedPersonEmail {

	public static void main(String[] args) throws Exception {

		Person2 person = new Person2();
		person.setName("Boki");

		Email email = new Email();
		email.setEmail("yahoo@yahoo.com.cn");
		person.getEmails().add(email);

		email = new Email();
		email.setEmail("173@173.com");
		person.getEmails().add(email);

		Session session = HibernateSessionFactory.getSession();
		session.beginTransaction();

		// �x�s Person ��H�A�|�۰ʦ��p�x�s Email �ﹳ
		session.persist(person);

		// �M��֦� ���ꤤ��q�l�l�� ���Ҧ��ϥΪ�
		List list = session.createQuery(
				" select p from Person2 p left join fetch p.emails e "
						+ " where e.email like '%@yahoo.com.cn' ").list();

		// ��X�ϥΪ̤Ψ�Ҧ����ϥΪ�
		for (Person2 p : (List<Person2>) list) {
			System.out.println("Person: " + p.getName());
			for (Email e : p.getEmails()) {
				System.out.println("\tEmail: " + e.getEmail());
			}
		}

		// �R�� Person ��H�A�|�۰ʦ��p�R���ݩ󥦪� Email ��Ʈw�O��
		session.delete(person);

		session.getTransaction().commit();
		session.close();

	}
}
