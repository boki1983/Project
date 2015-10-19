package com.boki.hibernate.test;

import java.util.List;

import org.hibernate.Session;

import com.boki.hibernate.bean.Address;
import com.boki.hibernate.bean.Customer;
import com.boki.hibernate.util.HibernateSessionFactory;

public class TestAnnotationedCustomerAddress {

	@SuppressWarnings("all")
	public static void main(String[] args) throws Exception {

		Customer customer = new Customer();
		customer.setName("boki");

		Address address = new Address();
		address.setAddress("�_�ʥ������Ϥ�����");
		address.setTelephone("010-77883210");
		address.setZip("100001");

		// address.setCustomer(customer);

		Session session = HibernateSessionFactory.getSession();
		session.beginTransaction();

		// �x�s customer�A��Ʈw�|�� customer �۰ʤ��t ID
		session.persist(customer);

		// �n��u�]�w address �� ID �O�Ҩ��ID�@�P
		address.setId(customer.getId());

		// �x�s address
		session.persist(address);

		session.flush();

		List<Customer> list = session.createQuery(
				" select c from Customer c where c.name = :name ")
				.setParameter("name", "boki").list();

		for (Customer c : list) {
			session.refresh(c);
			System.out.println("�Ȥ�m�W�G" + c.getName());
			System.out.println("\t�q�ܡG" + c.getAddress().getTelephone());
			System.out.println("\t�l���ϸ��G" + c.getAddress().getZip());
			System.out.println("\t�a�}�G" + c.getAddress().getAddress());
		}

		session.getTransaction().commit();
		session.close();
	}
}
