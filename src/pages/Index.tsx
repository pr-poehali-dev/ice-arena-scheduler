import { useState } from "react";
import React from "react";
import Icon from "@/components/ui/icon";

type Tab = "schedule" | "bookings" | "stats" | "profile";

const SCHEDULE_DATA = [
  { time: "06:00", title: "Фигурное катание", type: "Фигурное катание", arena: "Орион", spots: 3, total: 12, status: "available" },
  { time: "08:00", title: "Хоккейная тренировка", type: "Хоккей", arena: "Орион", spots: 0, total: 20, status: "full" },
  { time: "10:00", title: "Открытое катание", type: "Свободное", arena: "Орион", spots: 45, total: 60, status: "available" },
  { time: "12:00", title: "Детская секция", type: "Детская секция", arena: "Орион", spots: 7, total: 15, status: "available" },
  { time: "14:00", title: "Тренировка сборной", type: "Хоккей", arena: "Орион", spots: 0, total: 25, status: "closed" },
  { time: "16:00", title: "Вечернее катание", type: "Свободное", arena: "Орион", spots: 38, total: 60, status: "available" },
  { time: "18:00", title: "Профи-тренировка", type: "Скоростное", arena: "Орион", spots: 2, total: 8, status: "available" },
  { time: "20:00", title: "Ночное катание", type: "Свободное", arena: "Орион", spots: 22, total: 60, status: "available" },
];

const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const DATES = [9, 10, 11, 12, 13, 14, 15];

const BOOKINGS = [
  { id: "B-2024", title: "Вечернее катание", date: "Сегодня, 16:00", arena: "Орион", duration: "90 мин", status: "active", type: "Свободное" },
  { id: "B-2026", title: "Профи-тренировка", date: "14 июня, 18:00", arena: "Орион", duration: "120 мин", status: "upcoming", type: "Скоростное" },
  { id: "B-2025", title: "Открытое катание", date: "10 июня, 10:00", arena: "Орион", duration: "90 мин", status: "done", type: "Свободное" },
  { id: "B-2024", title: "Хоккей", date: "8 июня, 08:00", arena: "Орион", duration: "60 мин", status: "done", type: "Хоккей" },
];

const STATS_MONTHLY = [
  { month: "Янв", hours: 12, sessions: 8 },
  { month: "Фев", hours: 18, sessions: 12 },
  { month: "Мар", hours: 22, sessions: 15 },
  { month: "Апр", hours: 16, sessions: 11 },
  { month: "Май", hours: 28, sessions: 19 },
  { month: "Июн", hours: 20, sessions: 14 },
];

const RECORDS = [
  { label: "Макс. скорость", value: "32.4", unit: "км/ч", icon: "Zap", color: "text-yellow-400" },
  { label: "Лучшее время (100м)", value: "9.8", unit: "сек", icon: "Timer", color: "text-sky-400" },
  { label: "Прыжков за трен.", value: "47", unit: "прыжков", icon: "TrendingUp", color: "text-teal-400" },
  { label: "Серия дней", value: "21", unit: "дней подряд", icon: "Flame", color: "text-orange-400" },
];

const TYPE_COLORS: Record<string, string> = {
  "Фигурное катание": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "Хоккей": "bg-red-500/20 text-red-300 border-red-500/30",
  "Свободное": "bg-sky-500/10 text-sky-300 border-sky-500/30",
  "Детская секция": "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  "Скоростное": "bg-green-500/20 text-green-300 border-green-500/30",
  "Фигурное": "bg-purple-500/20 text-purple-300 border-purple-500/30",
};

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("schedule");
  const [activeDay, setActiveDay] = useState(3);
  const [filterType, setFilterType] = useState("Все");

  const maxHours = Math.max(...STATS_MONTHLY.map(s => s.hours));

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative overflow-hidden">
      {/* Декоративный фон */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-sky-500/5 blur-3xl" />
        <div className="absolute bottom-20 right-0 w-64 h-64 rounded-full bg-teal-500/5 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-5 pt-12 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-xs font-golos tracking-widest uppercase mb-1">Ледовый дворец</p>
            <h1 className="text-4xl text-foreground" style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, letterSpacing: "0.12em", textShadow: "0 0 24px hsl(195 100% 50% / 0.7)" }}>
              <span className="text-sky-400">ОРИОН</span>
            </h1>
          </div>
          <div className="relative">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center"
              style={{ boxShadow: "0 0 16px hsl(195 100% 50% / 0.4)" }}>
              <span className="font-bebas text-background text-lg">АК</span>
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-background" />
          </div>
        </div>

        {/* Quick stats strip */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { label: "Тренировок", value: "89", icon: "Dumbbell" },
            { label: "Часов на льду", value: "116", icon: "Clock" },
            { label: "Рекордов", value: "4", icon: "Trophy" },
          ].map((s, i) => (
            <div
              key={i}
              className="rounded-xl p-3 text-center animate-fade-in"
              style={{
                animationDelay: `${i * 0.08}s`,
                background: "linear-gradient(135deg, hsl(220 25% 12% / 0.9), hsl(220 25% 8% / 0.9))",
                border: "1px solid hsl(195 100% 50% / 0.15)",
              }}
            >
              <Icon name={s.icon} size={14} className="text-sky-400 mx-auto mb-1" />
              <div className="font-bebas text-xl text-foreground">{s.value}</div>
              <div className="text-muted-foreground text-[10px] font-golos">{s.label}</div>
            </div>
          ))}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 relative z-10 overflow-y-auto pb-28 px-5">

        {/* РАСПИСАНИЕ */}
        {activeTab === "schedule" && (
          <div className="animate-fade-in">
            {/* Дни недели */}
            <div className="flex gap-2 mb-5 overflow-x-auto pb-1 -mx-1 px-1">
              {DAYS.map((day, i) => (
                <button
                  key={i}
                  onClick={() => setActiveDay(i)}
                  className={`flex-shrink-0 flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 ${
                    activeDay === i
                      ? "bg-sky-400 text-slate-900"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={activeDay === i
                    ? { boxShadow: "0 0 16px hsl(195 100% 50% / 0.4)" }
                    : { background: "hsl(220 25% 10% / 0.9)", border: "1px solid hsl(220 20% 18%)" }
                  }
                >
                  <span className="text-[10px] font-golos font-medium tracking-wide uppercase">{day}</span>
                  <span className={`font-bebas text-xl mt-0.5 ${activeDay === i ? "text-slate-900" : "text-foreground"}`}>
                    {DATES[i]}
                  </span>
                  {i === 3 && (
                    <span className={`w-1 h-1 rounded-full mt-0.5 ${activeDay === i ? "bg-slate-900" : "bg-sky-400"}`} />
                  )}
                </button>
              ))}
            </div>

            {/* Фильтр */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-1 -mx-1 px-1">
              {["Все", "Свободное", "Хоккей", "Фигурное"].map(type => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-golos font-medium transition-all duration-200 border ${
                    filterType === type
                      ? "bg-sky-400/20 text-sky-300 border-sky-400/50"
                      : "border-border text-muted-foreground hover:border-sky-400/30"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Слоты */}
            <div className="space-y-3">
              {SCHEDULE_DATA.filter(s =>
                filterType === "Все" ||
                s.type.includes(filterType)
              ).map((slot, i) => (
                <div
                  key={i}
                  className={`rounded-2xl p-4 transition-all duration-300 animate-slide-up ${
                    slot.status === "full" || slot.status === "closed" ? "opacity-50" : "hover:-translate-y-1"
                  }`}
                  style={{
                    animationDelay: `${i * 0.06}s`,
                    background: "linear-gradient(135deg, hsl(220 25% 12% / 0.9), hsl(220 25% 8% / 0.9))",
                    border: slot.status === "available"
                      ? "1px solid hsl(195 100% 50% / 0.15)"
                      : "1px solid hsl(220 20% 18%)",
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-14 text-center py-2 rounded-xl bg-sky-400/10">
                        <span className="font-bebas text-lg leading-none text-sky-400">{slot.time}</span>
                      </div>
                      <div>
                        <div className="font-golos font-semibold text-foreground text-sm">{slot.title}</div>
                        <div className="text-muted-foreground text-xs mt-0.5 flex items-center gap-1">
                          <Icon name="MapPin" size={10} />
                          {slot.arena}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">

                      {slot.status === "closed" && (
                        <span className="text-xs text-muted-foreground font-golos">Закрыто</span>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className={`text-[10px] font-golos px-2 py-0.5 rounded-full border ${TYPE_COLORS[slot.type] || "bg-muted text-muted-foreground border-border"}`}>
                      {slot.type}
                    </span>
                    {slot.type === "Свободное" && (
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-20 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${((slot.total - slot.spots) / slot.total) * 100}%`,
                              background: "linear-gradient(90deg, hsl(195 100% 50%), hsl(170 80% 45%))",
                            }}
                          />
                        </div>
                        <span className="text-[10px] text-muted-foreground font-golos">{slot.spots}/{slot.total}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* МОИ БРОНИРОВАНИЯ */}
        {activeTab === "bookings" && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bebas text-2xl text-foreground tracking-wide">Мои бронирования</h2>
              <span className="text-xs text-muted-foreground font-golos bg-muted px-2 py-1 rounded-full">
                {BOOKINGS.filter(b => b.status !== "done").length} активных
              </span>
            </div>

            {/* Активное сейчас */}
            {BOOKINGS.filter(b => b.status === "active").map((booking, i) => (
              <div
                key={i}
                className="relative rounded-2xl p-4 mb-4 overflow-hidden animate-scale-in"
                style={{
                  background: "linear-gradient(135deg, hsl(195 100% 50% / 0.15), hsl(170 80% 45% / 0.1))",
                  border: "1px solid hsl(195 100% 50% / 0.3)",
                }}
              >
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs text-green-400 font-golos font-medium">Сейчас</span>
                </div>
                <div className="text-xs text-sky-400 font-golos tracking-wide mb-1">#{booking.id}</div>
                <div className="font-bebas text-2xl text-foreground">{booking.title}</div>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                    <Icon name="MapPin" size={12} />
                    <span className="font-golos">{booking.arena}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                    <Icon name="Clock" size={12} />
                    <span className="font-golos">{booking.duration}</span>
                  </div>
                </div>
                <div className="mt-3 h-1.5 bg-muted/50 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "45%",
                      background: "linear-gradient(90deg, hsl(195 100% 50%), hsl(170 80% 45%))",
                      boxShadow: "0 0 8px hsl(195 100% 50% / 0.5)"
                    }}
                  />
                </div>
                <div className="text-[10px] text-muted-foreground font-golos mt-1">45 мин из 90</div>
              </div>
            ))}

            {/* Предстоящие */}
            <h3 className="font-golos font-semibold text-xs text-muted-foreground mb-3 mt-2 uppercase tracking-widest">Предстоящие</h3>
            <div className="space-y-3 mb-5">
              {BOOKINGS.filter(b => b.status === "upcoming").map((booking, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 animate-slide-up"
                  style={{
                    animationDelay: `${i * 0.08}s`,
                    background: "linear-gradient(135deg, hsl(220 25% 12% / 0.9), hsl(220 25% 8% / 0.9))",
                    border: "1px solid hsl(195 100% 50% / 0.15)",
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[10px] text-sky-400 font-golos mb-1">#{booking.id}</div>
                      <div className="font-golos font-semibold text-foreground text-sm">{booking.title}</div>
                      <div className="flex items-center gap-3 mt-1.5">
                        <div className="flex items-center gap-1 text-muted-foreground text-xs">
                          <Icon name="Calendar" size={11} />
                          <span className="font-golos">{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground text-xs">
                          <Icon name="MapPin" size={11} />
                          <span className="font-golos">{booking.arena}</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-xs text-red-400 hover:text-red-300 font-golos border border-red-400/30 px-2.5 py-1 rounded-lg transition-colors">
                      Отменить
                    </button>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`text-[10px] font-golos px-2 py-0.5 rounded-full border ${TYPE_COLORS[booking.type] || ""}`}>
                      {booking.type}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-golos">{booking.duration}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* История */}
            <h3 className="font-golos font-semibold text-xs text-muted-foreground mb-3 uppercase tracking-widest">История</h3>
            <div className="space-y-2">
              {BOOKINGS.filter(b => b.status === "done").map((booking, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl opacity-50"
                  style={{ border: "1px solid hsl(220 20% 18%)" }}
                >
                  <div>
                    <div className="font-golos text-sm text-foreground">{booking.title}</div>
                    <div className="text-xs text-muted-foreground font-golos mt-0.5">{booking.date} · {booking.arena}</div>
                  </div>
                  <Icon name="CheckCircle" size={16} className="text-teal-400" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* СТАТИСТИКА */}
        {activeTab === "stats" && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bebas text-2xl text-foreground tracking-wide">Статистика</h2>
              <span className="text-xs text-sky-400 font-golos">2026</span>
            </div>

            {/* Рекорды */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {RECORDS.map((rec, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 animate-slide-up"
                  style={{
                    animationDelay: `${i * 0.07}s`,
                    background: "linear-gradient(135deg, hsl(220 25% 12% / 0.9), hsl(220 25% 8% / 0.9))",
                    border: "1px solid hsl(195 100% 50% / 0.12)",
                  }}
                >
                  <Icon name={rec.icon} size={20} className={`${rec.color} mb-2`} />
                  <div className={`font-bebas text-3xl ${rec.color}`}>{rec.value}</div>
                  <div className="text-muted-foreground text-[10px] font-golos mt-0.5">{rec.unit}</div>
                  <div className="text-foreground text-xs font-golos font-medium mt-1">{rec.label}</div>
                </div>
              ))}
            </div>

            {/* График часов по месяцам */}
            <div
              className="rounded-2xl p-4 mb-4 animate-fade-in"
              style={{
                background: "linear-gradient(135deg, hsl(220 25% 12% / 0.9), hsl(220 25% 8% / 0.9))",
                border: "1px solid hsl(195 100% 50% / 0.12)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-golos font-semibold text-foreground text-sm">Часы на льду</span>
                <span className="text-xs text-sky-400 font-golos">116 ч всего</span>
              </div>
              <div className="flex items-end gap-2 h-28">
                {STATS_MONTHLY.map((m, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[9px] text-muted-foreground font-golos">{m.hours}ч</span>
                    <div
                      className="w-full rounded-t-lg overflow-hidden animate-slide-up"
                      style={{
                        height: `${(m.hours / maxHours) * 80}px`,
                        animationDelay: `${i * 0.08}s`,
                        background: i === 5
                          ? "linear-gradient(180deg, hsl(195 100% 50%), hsl(170 80% 45%))"
                          : "linear-gradient(180deg, hsl(195 100% 50% / 0.5), hsl(170 80% 45% / 0.3))",
                        boxShadow: i === 5 ? "0 0 12px hsl(195 100% 50% / 0.4)" : "none"
                      }}
                    />
                    <span className="text-[9px] text-muted-foreground font-golos">{m.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Сессии по месяцам */}
            <div
              className="rounded-2xl p-4 animate-fade-in"
              style={{
                background: "linear-gradient(135deg, hsl(220 25% 12% / 0.9), hsl(220 25% 8% / 0.9))",
                border: "1px solid hsl(195 100% 50% / 0.12)",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-golos font-semibold text-foreground text-sm">Тренировки по месяцам</span>
              </div>
              <div className="space-y-3">
                {STATS_MONTHLY.map((m, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground font-golos w-8">{m.month}</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full animate-slide-in-right"
                        style={{
                          width: `${(m.sessions / 20) * 100}%`,
                          animationDelay: `${i * 0.06}s`,
                          background: "linear-gradient(90deg, hsl(195 100% 50%), hsl(170 80% 45%))",
                          boxShadow: "0 0 8px hsl(195 100% 50% / 0.4)"
                        }}
                      />
                    </div>
                    <span className="text-xs text-sky-400 font-golos font-semibold w-6 text-right">{m.sessions}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ПРОФИЛЬ */}
        {activeTab === "profile" && (
          <div className="animate-fade-in">
            {/* Аватар и имя */}
            <div className="flex flex-col items-center py-6 animate-scale-in">
              <div className="relative mb-4">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, hsl(195 100% 50%), hsl(170 80% 45%))",
                    boxShadow: "0 0 24px hsl(195 100% 50% / 0.4)"
                  }}
                >
                  <span className="font-bebas text-4xl text-slate-900">АК</span>
                </div>
                <button
                  className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: "hsl(220 25% 15%)", border: "1px solid hsl(220 20% 22%)" }}
                >
                  <Icon name="Pencil" size={12} className="text-muted-foreground" />
                </button>
              </div>
              <h2 className="font-bebas text-3xl text-foreground tracking-wide">Алексей Коваленко</h2>
              <p className="text-muted-foreground text-sm font-golos mt-1">Фигурное катание · Профессионал</p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-xs text-green-400 font-golos">Абонемент активен до 31.12.2026</span>
              </div>
            </div>

            {/* Карточка абонемента */}
            <div
              className="relative rounded-2xl p-5 mb-5 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, hsl(195 100% 50% / 0.2) 0%, hsl(170 80% 45% / 0.15) 50%, hsl(220 25% 12%) 100%)",
                border: "1px solid hsl(195 100% 50% / 0.3)",
              }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-sky-500/5 blur-2xl" />
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[10px] text-muted-foreground font-golos tracking-widest uppercase">Абонемент</div>
                  <div className="font-bebas text-2xl text-foreground mt-1">Премиум</div>
                  <div className="text-xs text-muted-foreground font-golos mt-0.5">Все арены · Безлимит</div>
                </div>
                <Icon name="CreditCard" size={32} className="text-sky-400/40" />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-muted-foreground font-golos">Номер карты</div>
                  <div className="font-golos font-medium text-sm text-foreground tracking-widest">•••• •••• •••• 4821</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-muted-foreground font-golos">До</div>
                  <div className="font-golos font-medium text-sm text-foreground">31.12.26</div>
                </div>
              </div>
            </div>

            {/* Настройки */}
            <div className="space-y-2">
              {[
                { icon: "User", label: "Личные данные", sub: "ФИО, дата рождения, контакты" },
                { icon: "Bell", label: "Уведомления", sub: "Напоминания о тренировках" },
                { icon: "Shield", label: "Безопасность", sub: "Пароль и авторизация" },
                { icon: "Trophy", label: "Достижения", sub: "4 рекорда, 89 тренировок" },
                { icon: "HelpCircle", label: "Поддержка", sub: "Связаться с командой" },
              ].map((item, i) => (
                <button
                  key={i}
                  className="w-full rounded-2xl px-4 py-3.5 flex items-center justify-between transition-all duration-300 hover:-translate-y-0.5 animate-slide-up"
                  style={{
                    animationDelay: `${i * 0.06}s`,
                    background: "linear-gradient(135deg, hsl(220 25% 12% / 0.9), hsl(220 25% 8% / 0.9))",
                    border: "1px solid hsl(195 100% 50% / 0.1)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-sky-400/10 flex items-center justify-center">
                      <Icon name={item.icon} size={16} className="text-sky-400" />
                    </div>
                    <div className="text-left">
                      <div className="font-golos font-medium text-foreground text-sm">{item.label}</div>
                      <div className="text-muted-foreground text-[11px] font-golos">{item.sub}</div>
                    </div>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                </button>
              ))}

              <button className="w-full mt-2 flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-red-500/20 text-red-400 hover:bg-red-500/5 transition-colors">
                <Icon name="LogOut" size={16} />
                <span className="font-golos font-medium text-sm">Выйти из аккаунта</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-20">
        <div className="mx-4 mb-4 backdrop-blur-xl rounded-2xl" style={{ background: "hsl(220 25% 10% / 0.95)", border: "1px solid hsl(195 100% 50% / 0.12)" }}>
          <div className="flex items-center justify-around py-3 px-2">
            {([
              { id: "schedule", icon: "Calendar", label: "Расписание" },
              { id: "bookings", icon: "BookMarked", label: "Брони" },
              { id: "stats", icon: "BarChart2", label: "Статистика" },
              { id: "profile", icon: "User", label: "Профиль" },
            ] as { id: Tab; icon: string; label: string }[]).map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-all duration-200"
              >
                <Icon
                  name={tab.icon}
                  size={20}
                  className={activeTab === tab.id ? "text-sky-400" : "text-muted-foreground"}
                  style={activeTab === tab.id ? { filter: "drop-shadow(0 0 6px hsl(195 100% 50% / 0.8))" } as React.CSSProperties : {}}
                />
                <span className={`text-[10px] font-golos font-medium ${activeTab === tab.id ? "text-sky-400" : "text-muted-foreground"}`}>
                  {tab.label}
                </span>
                {activeTab === tab.id && (
                  <span className="w-1 h-1 rounded-full bg-sky-400" style={{ boxShadow: "0 0 6px hsl(195 100% 50%)" }} />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}