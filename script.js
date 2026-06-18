// FlowMind AI - Landing Page Controller

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Sticky Header Effects
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 3. Mobile Navigation Drawer Toggle
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('open');
      // Toggle nav toggle icon animation
      const spans = navToggle.querySelectorAll('span');
      if (navMenu.classList.contains('open')) {
        spans[0].style.transform = 'translateY(8px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // 4. Scroll Reveal (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // If it's a showcase panel or benefits preview, we trigger internal animations
        if (entry.target.classList.contains('showcase-wrapper')) {
          triggerTimelineAnimations();
        }
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // 5. Spotlight Hover Effect (Cursor-following radial borders)
  const spotlightCards = document.querySelectorAll('.spotlight-card, .feature-card');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 6. Showcase Tabs Switcher
  const showcaseBtns = document.querySelectorAll('.showcase-nav-btn');
  const showcasePanels = document.querySelectorAll('.showcase-panel');

  showcaseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');

      showcaseBtns.forEach(b => b.classList.remove('active'));
      showcasePanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePanel = document.getElementById(target);
      activePanel.classList.add('active');

      if (target === 'roadmap-panel') {
        triggerTimelineAnimations();
      }
    });
  });

  // Function to animate Gantt progress bars
  function triggerTimelineAnimations() {
    const bars = document.querySelectorAll('.timeline-bar');
    bars.forEach(bar => {
      // Re-trigger width animation by grabbing style or attribute
      const width = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = width;
      }, 50);
    });
  }

  // 7. Simulated AI Copilot Interactive Console
  const copilotInput = document.getElementById('copilot-custom-input');
  const btnRunCopilot = document.getElementById('btn-run-copilot');
  const screenContent = document.getElementById('copilot-screen-content');
  const suggestionPills = document.querySelectorAll('.copilot-suggestion-pill');

  if (btnRunCopilot && copilotInput && screenContent) {
    suggestionPills.forEach(pill => {
      pill.addEventListener('click', () => {
        copilotInput.value = pill.textContent;
        runCopilotCommand(pill.textContent);
      });
    });

    btnRunCopilot.addEventListener('click', () => {
      runCopilotCommand(copilotInput.value);
    });

    copilotInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        runCopilotCommand(copilotInput.value);
      }
    });
  }

  function runCopilotCommand(cmdText) {
    if (!cmdText.trim()) return;
    
    // Convert commands to outputs
    let outputHtml = `$ flowmind-ai --cmd "${cmdText}"<br>`;
    
    if (cmdText.includes('create-jira-issue')) {
      outputHtml += `Connecting to Jira cloud... <span style="color: #4ADE80;">OK</span><br>`;
      outputHtml += `Generating payload fields from context...<br>`;
      outputHtml += `<span style="color: #A5B4FC;">[PAYLOAD] Summary: Fix webhook error</span><br>`;
      outputHtml += `<span style="color: #A5B4FC;">[PAYLOAD] Project: Integration Engine</span><br>`;
      outputHtml += `Uploading ticket data... OK<br>`;
      outputHtml += `Jira Issue Created: <span style="color: #22D3EE;">FM-9402</span> [HIGH PRIORITY]<br>`;
      outputHtml += `Notifying channel <span style="color: #C084FC;">#eng-alerts</span> on Slack... Done.`;
    } else if (cmdText.includes('summarize-docs')) {
      outputHtml += `Querying document database... <span style="color: #4ADE80;">OK</span><br>`;
      outputHtml += `Reading transcript files for "Integrations schema"...<br>`;
      outputHtml += `Summarizing via cognitive pipeline...<br>`;
      outputHtml += `<span style="color: #94A3B8;">--- SUMMARY OUTPUT ---</span><br>`;
      outputHtml += `• Schema uses OAuth2 standard credentials.<br>`;
      outputHtml += `• Key hooks register endpoint at /webhooks/v1/sync.<br>`;
      outputHtml += `• Rate limit configured at 500 req/min.`;
    } else if (cmdText.includes('deploy-webhook')) {
      outputHtml += `Connecting API Gateway host... <span style="color: #4ADE80;">OK</span><br>`;
      outputHtml += `Verifying environment credentials... OK<br>`;
      outputHtml += `Deploying webhook trigger pipeline: "Trigger sync event"...<br>`;
      outputHtml += `Webhook live at: <span style="color: #22D3EE;">https://api.flowmind.ai/hooks/sync_evt</span><br>`;
      outputHtml += `Status: <span style="color: #4ADE80;">ACTIVE & LISTENING</span>`;
    } else {
      outputHtml += `Parsing custom text prompt...<br>`;
      outputHtml += `Thinking...<br>`;
      outputHtml += `Processing context data feeds...<br>`;
      outputHtml += `FlowMind Copilot response: "I've processed your custom query and prepared the necessary workflow automation rules."`;
    }

    screenContent.innerHTML = outputHtml;
  }

  // 8. Pricing Annually / Monthly Switcher
  const pricingToggle = document.getElementById('pricing-toggle');
  const labelMonthly = document.getElementById('label-monthly');
  const labelAnnual = document.getElementById('label-annual');
  const priceStarter = document.getElementById('price-starter');
  const pricePro = document.getElementById('price-pro');
  const priceEnterprise = document.getElementById('price-enterprise');

  if (pricingToggle) {
    pricingToggle.addEventListener('click', () => {
      pricingToggle.classList.toggle('annual');
      const isAnnual = pricingToggle.classList.contains('annual');

      if (isAnnual) {
        labelAnnual.classList.add('active');
        labelMonthly.classList.remove('active');
        // 20% discount calculation (Annual pricing pre-billed)
        animatePriceChange(priceStarter, 15);
        animatePriceChange(pricePro, 39);
        animatePriceChange(priceEnterprise, 119);
      } else {
        labelMonthly.classList.add('active');
        labelAnnual.classList.remove('active');
        animatePriceChange(priceStarter, 19);
        animatePriceChange(pricePro, 49);
        animatePriceChange(priceEnterprise, 149);
      }
    });
  }

  function animatePriceChange(element, newPrice) {
    if (!element) return;
    element.style.opacity = '0';
    element.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      element.textContent = newPrice;
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, 200);
  }

  // 9. FAQ Accordion Panels (Smooth Heights)
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other accordion items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-content').style.maxHeight = '0px';
        otherItem.querySelector('.faq-content').style.opacity = '0';
      });

      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = `${content.scrollHeight}px`;
        content.style.opacity = '1';
      } else {
        item.classList.remove('active');
        content.style.maxHeight = '0px';
        content.style.opacity = '0';
      }
    });
  });

  // 10. Hero Mockup AI Chat Simulator (Dynamic loop)
  const chatBubble = document.getElementById('simulated-chat-bubble');
  const chatCycles = [
    {
      user: "FlowMind, summarize the key action items from the Product roadmap sync.",
      ai: "Sure! I found 3 key items:<br>1. Alex to ship the integrations pipeline update.<br>2. Sarah to review pricing tier alignment docs.<br>3. Setup Zapier trigger for webhook analytics notifications."
    },
    {
      user: "FlowMind, what was our uptime status yesterday?",
      ai: "Yesterday our primary API gateway had 100% uptime with average response latency of 142ms. Zero alerts were raised."
    },
    {
      user: "FlowMind, create a calendar slot for tomorrow's standup.",
      ai: "I've scheduled 'Daily Standup Sync' for tomorrow at 10:00 AM (EST). Added Sarah, Alex, and David, and shared the Google Meet link in Slack."
    }
  ];

  let cycleIndex = 0;
  if (chatBubble) {
    setInterval(() => {
      cycleIndex = (cycleIndex + 1) % chatCycles.length;
      
      const parent = chatBubble.parentElement;
      const userBubble = parent.querySelector('.chat-bubble.user');
      
      // Animate transition out
      userBubble.style.opacity = '0';
      chatBubble.style.opacity = '0';
      
      setTimeout(() => {
        userBubble.textContent = chatCycles[cycleIndex].user;
        chatBubble.innerHTML = chatCycles[cycleIndex].ai;
        
        userBubble.style.opacity = '1';
        chatBubble.style.opacity = '1';
      }, 500);
    }, 7000);
  }
});
