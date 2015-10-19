package com.boki.hibernate.test;

import java.util.List;

import javax.swing.JOptionPane;

import org.hibernate.Session;

import com.boki.hibernate.bean.Email;
import com.boki.hibernate.bean.Person2;
import com.boki.hibernate.util.HibernateSessionFactory;

public class TestLazyInitializationException {

	static int createdId = 0;

	static {// 類載入的時候儲存一個Person

		Person2 person = new Person2();// 初始化一個 Person 實例
		person.setName("Jane");

		Email email = new Email();
		email.setEmail("yahoo@yahoo.com.cn");
		person.getEmails().add(email);

		Session session = HibernateSessionFactory.getSession(); // 開啟會話
		session.beginTransaction(); // 開啟交易

		session.persist(person);// 儲存到資料庫
		createdId = person.getId();// 將ID儲存起來

		session.getTransaction().commit();// 傳送交易
		session.close(); // 關閉會話
	}

	public static void main(String[] args) throws Exception {

		Session session = HibernateSessionFactory.getSession();// 查詢不用開啟交易
		Person2 p = (Person2) session.get(Person2.class, createdId);
		session.close();

		try {
			List<Email> list = p.getEmails(); // 載入資料，將會拋出例外

			System.out.println(p.getName() + " 的電子郵件: ");
			for (Email mail : list) {	// 循環輸出Email
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
