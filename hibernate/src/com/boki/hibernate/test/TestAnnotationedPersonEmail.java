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

		// 儲存 Person 對象，會自動串聯儲存 Email 對像
		session.persist(person);

		// 尋找擁有 雅虎中文電子郵件 的所有使用者
		List list = session.createQuery(
				" select p from Person2 p left join fetch p.emails e "
						+ " where e.email like '%@yahoo.com.cn' ").list();

		// 輸出使用者及其所有的使用者
		for (Person2 p : (List<Person2>) list) {
			System.out.println("Person: " + p.getName());
			for (Email e : p.getEmails()) {
				System.out.println("\tEmail: " + e.getEmail());
			}
		}

		// 刪除 Person 對象，會自動串聯刪除屬於它的 Email 資料庫記錄
		session.delete(person);

		session.getTransaction().commit();
		session.close();

	}
}
