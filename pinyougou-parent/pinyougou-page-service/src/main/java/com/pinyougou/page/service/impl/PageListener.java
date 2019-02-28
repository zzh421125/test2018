package com.pinyougou.page.service.impl;

import javax.jms.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.pinyougou.page.service.ItemPageService;
/**
 * 监听类（用于生成网页）
 * @author Administrator
 *
 */
@Component
public class PageListener implements MessageListener {

	@Autowired
	private ItemPageService itemPageService;
	
	@Override
	public void onMessage(Message message) {
		ObjectMessage objectMessage =(ObjectMessage)message;
		try {
			Long goodsId= (Long) objectMessage.getObject();
			System.out.println("接收到消息："+goodsId);
			boolean b = itemPageService.genItemHtml(goodsId);
			System.out.println("网页生成结果："+b);
			
		} catch (JMSException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}
