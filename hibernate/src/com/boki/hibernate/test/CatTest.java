package com.boki.hibernate.test;

import java.awt.Font;
import java.util.Date;
import java.util.List;

import javax.swing.JOptionPane;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.boki.hibernate.bean.Cat;
import com.boki.hibernate.util.HibernateSessionFactory;

public class CatTest {

	public static void main(String[] args) {

		Cat mother = new Cat();
		mother.setName("Mary White");
		mother.setDescription("The Mama cat. ");
		mother.setCreateDate(new Date());

		Cat kitty = new Cat();
		kitty.setName("Kitty");
		kitty.setDescription("Hello Kitty. ");
		kitty.setMother(mother);
		kitty.setCreateDate(new Date());

		Cat mimmy = new Cat();
		mimmy.setName("Mimmy");
		mimmy.setDescription("Kitty's little twin sister. ");
		mimmy.setMother(mother);
		mimmy.setCreateDate(new Date());

		// 開啟一個 Hibernate 對話
		Session session = HibernateSessionFactory.getSessionFactory().openSession();
		// 開啟一個交易
		Transaction trans = session.beginTransaction();

		// 將三隻貓的資料儲存到資料庫
		session.persist(mother);
		session.persist(kitty);
		session.persist(mimmy);

		// 查詢資料中的所有的貓
		@SuppressWarnings("all")
		List<Cat> catList = session.createQuery(" from Cat ").list();

		StringBuffer result = new StringBuffer();
		result.append("資料庫裡的所有的貓：\r\n\r\n");

		// 檢查 輸出貓與貓媽媽
		for (Cat cc : catList) {
			result.append("貓: " + cc.getName() + ",          ");
			result.append("貓媽媽: "
					+ (cc.getMother() == null ? "沒有記錄" : cc.getMother()
							.getName()));
			result.append("\r\n");
		}
		
		List<Cat> ccList = session.createQuery(" from Cat ").setFirstResult(0).setMaxResults(10).list();
		
		for (Cat cc : ccList) {
			System.out.println("貓: " + cc.getName() + ",          ");
			System.out.println("貓媽媽: "
					+ (cc.getMother() == null ? "沒有記錄" : cc.getMother()
							.getName()));
		}
		
		List<Cat> nqList = session.getNamedQuery("all cat").list();
		
		for (Cat nq : nqList) {
			System.out.println("貓: " + nq.getName() + ",          ");
		}

		//  傳送交易
		trans.commit();
		//  關閉hibernate
		session.close();

		// 用 Swing 顯示查詢結果
		JOptionPane.getRootFrame().setFont(new Font("Arial", Font.BOLD, 14));
		JOptionPane.showMessageDialog(null, result.toString());
	}
}
