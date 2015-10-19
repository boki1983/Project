package com.boki.hibernate.servlet;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.boki.hibernate.bean.Cat;
import com.boki.hibernate.dao.BaseDAO;

public class CatServlet extends HttpServlet {

	private static final long serialVersionUID = 2874858791160046196L;
    // ����DAO����A�x������Cat
	private BaseDAO<Cat> baseDAO = new BaseDAO<Cat>();

	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");

		// �ھ�Action�ѼƨM�w������ؾާ@
		String action = request.getParameter("action");

		if ("initAdd".equals(action)) {
			// ��ܷs�W����
			initAdd(request, response);
		} else if ("add".equals(action)) {
			// �s�W�@�~
			add(request, response);
		} else if ("edit".equals(action)) {
			// ��ܭקﭶ��			
			edit(request, response);
		} else if ("save".equals(action)) {
			// �ק�����x�s��DB
			save(request, response);
		} else if ("view".equals(action)) {
			// �d��id��M�浧���
			view(request, response);
		} else if ("list".equals(action)) {
			// �d�ߩҦ����
			list(request, response);
		} else if ("delete".equals(action)) {
			// �R���@�~
			delete(request, response);
		} else {
			list(request, response);
		}
	}

	// ��ܼW�[����
	protected void initAdd(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		List<Cat> catList = baseDAO.list(" select c from Cat c ");

		request.setAttribute("catList", catList);

		request.getRequestDispatcher("/addCat.jsp").forward(request, response);
	}

	// ����s�W
	protected void add(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		int motherId = Integer.parseInt(request.getParameter("motherId"));
		String name = request.getParameter("name");
		String description = request.getParameter("description");
        // �d�X�Ŀ諸mother
		Cat mother = baseDAO.find(Cat.class, motherId);

		Cat cat = new Cat();
		cat.setName(name);
		cat.setMother(mother);
		cat.setDescription(description);
		cat.setCreateDate(new Date());

		baseDAO.create(cat);

		request.setAttribute("msg", "�W�[ '" + cat.getName() + "' ���\�C");
		list(request, response);
	}

	// 
	protected void view(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		int id = Integer.parseInt(request.getParameter("id"));

		Cat cat = baseDAO.find(Cat.class, id);

		request.setAttribute("cat", cat);

		request.getRequestDispatcher("/viewCat.jsp").forward(request, response);
	}

	// �C�X�Ҧ����
	protected void list(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// �d�ߩҦ�
		request.setAttribute("catList", baseDAO.list(" from Cat "));

		request.getRequestDispatcher("/listCat.jsp").forward(request, response);
	}

	// �s�譶��
	protected void edit(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		int id = Integer.parseInt(request.getParameter("id"));

		Cat cat = baseDAO.find(Cat.class, id);

		request.setAttribute("cat", cat);
		request.setAttribute("catList", baseDAO.list(" from Cat "));

		request.getRequestDispatcher("/addCat.jsp").forward(request, response);
	}

	// �x�s���
	protected void save(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		int id = Integer.parseInt(request.getParameter("id"));

		int motherId = Integer.parseInt(request.getParameter("motherId"));
		String name = request.getParameter("name");
		String description = request.getParameter("description");

		Cat cat = baseDAO.find(Cat.class, id);
		Cat mother = baseDAO.find(Cat.class, motherId);

		cat.setName(name);
		cat.setDescription(description);
		cat.setMother(mother);

		boolean hasLoop = false;
		Cat tmpMother = mother;
		while (tmpMother != null) {
			if (tmpMother.getId().intValue() == cat.getId().intValue()) {
				hasLoop = true;
				break;
			}
			tmpMother = tmpMother.getMother();
		}

		if (!hasLoop) {
			baseDAO.update(cat);
			request.setAttribute("msg", "�x�s '" + cat.getName() + "' ���\�C");
		} else {
			request.setAttribute("msg", "�x�s���ѡC�o�{�`���C");
		}

		list(request, response);
	}

	// �R�����
	protected void delete(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		int id = Integer.parseInt(request.getParameter("id"));

		Cat cat = baseDAO.find(Cat.class, id);

		if (cat != null) {

			List<Cat> catList = baseDAO
					.list(" select c from Cat c where c.mother.id = " + id);

			if (catList.size() > 0) {
				request.setAttribute("msg", "�L�k�R�� '" + cat.getName()
						+ "'�C�Х��R���lCat�C");
			} else {
				baseDAO.delete(cat);

				request.setAttribute("msg", "�R�� '" + cat.getName() + "' ���\�C");
			}
		}
		list(request, response);
	}
}
