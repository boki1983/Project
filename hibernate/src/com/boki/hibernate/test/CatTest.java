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

		// �}�Ҥ@�� Hibernate ���
		Session session = HibernateSessionFactory.getSessionFactory().openSession();
		// �}�Ҥ@�ӥ��
		Transaction trans = session.beginTransaction();

		// �N�T���ߪ�����x�s���Ʈw
		session.persist(mother);
		session.persist(kitty);
		session.persist(mimmy);

		// �d�߸�Ƥ����Ҧ�����
		@SuppressWarnings("all")
		List<Cat> catList = session.createQuery(" from Cat ").list();

		StringBuffer result = new StringBuffer();
		result.append("��Ʈw�̪��Ҧ����ߡG\r\n\r\n");

		// �ˬd ��X�߻P�߶���
		for (Cat cc : catList) {
			result.append("��: " + cc.getName() + ",          ");
			result.append("�߶���: "
					+ (cc.getMother() == null ? "�S���O��" : cc.getMother()
							.getName()));
			result.append("\r\n");
		}
		
		List<Cat> ccList = session.createQuery(" from Cat ").setFirstResult(0).setMaxResults(10).list();
		
		for (Cat cc : ccList) {
			System.out.println("��: " + cc.getName() + ",          ");
			System.out.println("�߶���: "
					+ (cc.getMother() == null ? "�S���O��" : cc.getMother()
							.getName()));
		}
		
		List<Cat> nqList = session.getNamedQuery("all cat").list();
		
		for (Cat nq : nqList) {
			System.out.println("��: " + nq.getName() + ",          ");
		}

		//  �ǰe���
		trans.commit();
		//  ����hibernate
		session.close();

		// �� Swing ��ܬd�ߵ��G
		JOptionPane.getRootFrame().setFont(new Font("Arial", Font.BOLD, 14));
		JOptionPane.showMessageDialog(null, result.toString());
	}
}
