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
    // 產生DAO物件，泛型物件為Cat
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

		// 根據Action參數決定執行哪種操作
		String action = request.getParameter("action");

		if ("initAdd".equals(action)) {
			// 顯示新增頁面
			initAdd(request, response);
		} else if ("add".equals(action)) {
			// 新增作業
			add(request, response);
		} else if ("edit".equals(action)) {
			// 顯示修改頁面			
			edit(request, response);
		} else if ("save".equals(action)) {
			// 修改後資料儲存到DB
			save(request, response);
		} else if ("view".equals(action)) {
			// 查詢id對映單筆資料
			view(request, response);
		} else if ("list".equals(action)) {
			// 查詢所有資料
			list(request, response);
		} else if ("delete".equals(action)) {
			// 刪除作業
			delete(request, response);
		} else {
			list(request, response);
		}
	}

	// 顯示增加頁面
	protected void initAdd(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		List<Cat> catList = baseDAO.list(" select c from Cat c ");

		request.setAttribute("catList", catList);

		request.getRequestDispatcher("/addCat.jsp").forward(request, response);
	}

	// 執行新增
	protected void add(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		int motherId = Integer.parseInt(request.getParameter("motherId"));
		String name = request.getParameter("name");
		String description = request.getParameter("description");
        // 查出勾選的mother
		Cat mother = baseDAO.find(Cat.class, motherId);

		Cat cat = new Cat();
		cat.setName(name);
		cat.setMother(mother);
		cat.setDescription(description);
		cat.setCreateDate(new Date());

		baseDAO.create(cat);

		request.setAttribute("msg", "增加 '" + cat.getName() + "' 成功。");
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

	// 列出所有資料
	protected void list(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// 查詢所有
		request.setAttribute("catList", baseDAO.list(" from Cat "));

		request.getRequestDispatcher("/listCat.jsp").forward(request, response);
	}

	// 編輯頁面
	protected void edit(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		int id = Integer.parseInt(request.getParameter("id"));

		Cat cat = baseDAO.find(Cat.class, id);

		request.setAttribute("cat", cat);
		request.setAttribute("catList", baseDAO.list(" from Cat "));

		request.getRequestDispatcher("/addCat.jsp").forward(request, response);
	}

	// 儲存資料
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
			request.setAttribute("msg", "儲存 '" + cat.getName() + "' 成功。");
		} else {
			request.setAttribute("msg", "儲存失敗。發現循環。");
		}

		list(request, response);
	}

	// 刪除資料
	protected void delete(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		int id = Integer.parseInt(request.getParameter("id"));

		Cat cat = baseDAO.find(Cat.class, id);

		if (cat != null) {

			List<Cat> catList = baseDAO
					.list(" select c from Cat c where c.mother.id = " + id);

			if (catList.size() > 0) {
				request.setAttribute("msg", "無法刪除 '" + cat.getName()
						+ "'。請先刪除子Cat。");
			} else {
				baseDAO.delete(cat);

				request.setAttribute("msg", "刪除 '" + cat.getName() + "' 成功。");
			}
		}
		list(request, response);
	}
}
