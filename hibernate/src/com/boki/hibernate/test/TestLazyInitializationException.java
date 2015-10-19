package com.boki.hibernate.test;

import java.util.List;

import javax.swing.JOptionPane;

import org.hibernate.Session;

import com.boki.hibernate.bean.Email;
import com.boki.hibernate.bean.Person2;
import com.boki.hibernate.util.HibernateSessionFactory;

public class TestLazyInitializationException {

	static int createdId = 0;

	static {// �����J���ɭ��x�s�@��Person

		Person2 person = new Person2();// ��l�Ƥ@�� Person ���
		person.setName("Jane");

		Email email = new Email();
		email.setEmail("yahoo@yahoo.com.cn");
		person.getEmails().add(email);

		Session session = HibernateSessionFactory.getSession(); // �}�ҷ|��
		session.beginTransaction(); // �}�ҥ��

		session.persist(person);// �x�s���Ʈw
		createdId = person.getId();// �NID�x�s�_��

		session.getTransaction().commit();// �ǰe���
		session.close(); // �����|��
	}

	public static void main(String[] args) throws Exception {

		Session session = HibernateSessionFactory.getSession();// �d�ߤ��ζ}�ҥ��
		Person2 p = (Person2) session.get(Person2.class, createdId);
		session.close();

		try {
			List<Email> list = p.getEmails(); // ���J��ơA�N�|�ߥX�ҥ~

			System.out.println(p.getName() + " ���q�l�l��: ");
			for (Email mail : list) {	// �`����XEmail
				System.out.println("\t" + mail.getEmail());
			}
		} catch (Exception e) {
			String title = e.getClass().getName();
			String msg = e.getMessage().replace(",", ",\r\n").replace(":",
					":\r\n");
			JOptionPane.showMessageDialog(null, msg, title,
					JOptionPane.ERROR_MESSAGE);
		}
	}
}
