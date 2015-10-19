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
		address.setAddress("北京市海澱區中關村");
		address.setTelephone("010-77883210");
		address.setZip("100001");

		// address.setCustomer(customer);

		Session session = HibernateSessionFactory.getSession();
		session.beginTransaction();

		// 儲存 customer，資料庫會為 customer 自動分配 ID
		session.persist(customer);

		// 要手工設定 address 的 ID 保證兩個ID一致
		address.setId(customer.getId());

		// 儲存 address
		session.persist(address);

		session.flush();

		List<Customer> list = session.createQuery(
				" select c from Customer c where c.name = :name ")
				.setParameter("name", "boki").list();

		for (Customer c : list) {
			session.refresh(c);
			System.out.println("客戶姓名：" + c.getName());
			System.out.println("\t電話：" + c.getAddress().getTelephone());
			System.out.println("\t郵遞區號：" + c.getAddress().getZip());
			System.out.println("\t地址：" + c.getAddress().getAddress());
		}

		session.getTransaction().commit();
		session.close();
	}
}
