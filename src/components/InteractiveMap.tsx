import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface Branch {
  id: number;
  name: string;
  shortName: string;
  manager: string;
  managerTitle: string;
  address: string;
  email: string;
  phone: string;
  x: number;
  y: number;
}

const branches: Branch[] = [
  {
    id: 1,
    name: 'АО "Дельта-Агро"',
    shortName: 'Дельта-Агро',
    manager: 'Крейс Владимир Александрович',
    managerTitle: 'Генеральный директор',
    address: '403341, Волгоградская область, г. Михайловка, пер. Боинский, д. 3А',
    email: 'delta_agro@bk.ru',
    phone: '8 (84463) 2-40-26, 2-62-85',
    x: 50,
    y: 45
  },
  {
    id: 2,
    name: 'ОП "Раздолье-Михайловка"',
    shortName: 'Раздолье-Михайловка',
    manager: 'Засыпкин Александр Александрович',
    managerTitle: 'Управляющий',
    address: '403334, Волгоградская обл., Михайловский р-н, х. Карагичевский, ул. Ленина, 6',
    email: 'kardelta_agro@mail.ru',
    phone: '8 (8443) 6-62-50',
    x: 48,
    y: 42
  },
  {
    id: 3,
    name: 'ОП "Раздолье-Рудня"',
    shortName: 'Раздолье-Рудня',
    manager: 'Демченко Алексей Николаевич',
    managerTitle: 'Управляющий',
    address: '403601, Волгоградская область, р.п. Рудня, ул. Комсомольская, 3',
    email: 'razdole.rud@mail.ru',
    phone: '8 (84453) 7-11-32',
    x: 55,
    y: 40
  },
  {
    id: 4,
    name: 'ОП "Раздолье-Жирновск"',
    shortName: 'Раздолье-Жирновск',
    manager: 'Карякин Николай Николаевич',
    managerTitle: 'Управляющий',
    address: '403764, Волгоградская область, Жирновский район, с. Кленовка, ул. Продольная, 2',
    email: 'zhirnovsk@bk.ru',
    phone: '—',
    x: 60,
    y: 38
  },
  {
    id: 5,
    name: 'ХПП Матышево',
    shortName: 'ХПП Матышево',
    manager: 'Бобылев Вадим Николаевич',
    managerTitle: 'Управляющий',
    address: '403617, Волгоградская область, Руднянский район, с. Матышево, д. 1',
    email: 'hppmatishevo@mail.ru',
    phone: '—',
    x: 53,
    y: 37
  },
  {
    id: 6,
    name: 'ОП "Раздолье-Медведицкое"',
    shortName: 'Раздолье-Медведицкое',
    manager: 'Димитров Алексей Дмитриевич',
    managerTitle: 'Управляющий',
    address: '403772, Волгоградская область, Жирновский р-н, пром.зона №1, производственная база',
    email: 'nikomnataliay@rambler.ru',
    phone: '8 (84454) 6-48-83',
    x: 58,
    y: 43
  }
];

const InteractiveMap = () => {
  const [hoveredBranch, setHoveredBranch] = useState<Branch | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <Badge className="bg-primary text-white text-base px-4 py-2">
          <Icon name="MapPin" size={16} className="mr-2" />
          Волгоградская область
        </Badge>
      </div>

      <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/20">
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full"
          style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
        >
          <defs>
            <radialGradient id="mapGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f0fdf4" />
              <stop offset="100%" stopColor="#dcfce7" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="regionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#84cc16" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          <rect width="100" height="100" fill="url(#mapGradient)" opacity="0.4" />

          <ellipse
            cx="53"
            cy="42"
            rx="15"
            ry="12"
            fill="url(#regionGradient)"
            stroke="#10b981"
            strokeWidth="0.3"
            strokeDasharray="2,1"
            opacity="0.6"
          />

          <text
            x="53"
            y="58"
            textAnchor="middle"
            fontSize="3.5"
            fill="#10b981"
            fontWeight="600"
            opacity="0.7"
            className="pointer-events-none"
          >
            Волгоградская область
          </text>

          {branches.map((branch, idx) => {
            const isHQ = branch.id === 1;
            const size = isHQ ? 5 : 3.5;
            const isHovered = hoveredBranch?.id === branch.id;
            const isSelected = selectedBranch?.id === branch.id;

            return (
              <g key={branch.id}>
                {(isHovered || isSelected) && (
                  <>
                    <circle
                      cx={branch.x}
                      cy={branch.y}
                      r={size + 3}
                      fill="#10b981"
                      opacity="0.2"
                      className="animate-ping"
                    />
                    <circle
                      cx={branch.x}
                      cy={branch.y}
                      r={size + 1.5}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="0.4"
                      opacity="0.6"
                    />
                  </>
                )}
                
                <circle
                  cx={branch.x}
                  cy={branch.y}
                  r={size}
                  fill={isHQ ? '#10b981' : '#84cc16'}
                  opacity="0.95"
                  className="cursor-pointer transition-all duration-300"
                  style={{
                    transform: isHovered || isSelected ? 'scale(1.2)' : 'scale(1)',
                    transformOrigin: `${branch.x}px ${branch.y}px`,
                    filter: isHovered || isSelected ? 'url(#glow)' : 'none'
                  }}
                  onMouseEnter={() => setHoveredBranch(branch)}
                  onMouseLeave={() => setHoveredBranch(null)}
                  onClick={() => setSelectedBranch(selectedBranch?.id === branch.id ? null : branch)}
                />
                
                <circle
                  cx={branch.x}
                  cy={branch.y}
                  r={size * 0.35}
                  fill="white"
                  opacity="0.9"
                  className="pointer-events-none"
                />

                {isHQ && (
                  <circle
                    cx={branch.x}
                    cy={branch.y}
                    r={size + 0.7}
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="0.5"
                    opacity="0.8"
                  />
                )}

                <text
                  x={branch.x}
                  y={branch.y - size - 1.5}
                  textAnchor="middle"
                  fontSize="2.8"
                  fill="#1e293b"
                  fontWeight="600"
                  className="pointer-events-none"
                >
                  {branch.shortName.split('-')[1] || branch.shortName}
                </text>
              </g>
            );
          })}

          {branches.slice(0, -1).map((branch, idx) => (
            <line
              key={`line-${branch.id}`}
              x1={branch.x}
              y1={branch.y}
              x2={branches[idx + 1].x}
              y2={branches[idx + 1].y}
              stroke="#10b981"
              strokeWidth="0.15"
              opacity="0.2"
              strokeDasharray="0.8,0.8"
            />
          ))}
        </svg>

        {hoveredBranch && (
          <div
            className="absolute bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl p-5 pointer-events-none animate-fade-in border-2 border-primary/30"
            style={{
              left: `${hoveredBranch.x}%`,
              top: `${hoveredBranch.y}%`,
              transform: 'translate(-50%, -115%)',
              minWidth: '280px',
              maxWidth: '320px'
            }}
          >
            <div className="font-bold text-lg mb-2 text-foreground">{hoveredBranch.shortName}</div>
            <div className="text-sm text-muted-foreground mb-3">{hoveredBranch.managerTitle}</div>
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <Icon name="User" size={14} />
              <span>{hoveredBranch.manager}</span>
            </div>
          </div>
        )}
      </div>

      {selectedBranch && (
        <Card className="animate-scale-in shadow-2xl border-2 border-primary/30 bg-gradient-to-br from-white to-green-50/30">
          <CardContent className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-3xl font-bold mb-2 text-foreground">{selectedBranch.name}</h3>
                <Badge className="bg-primary text-white">
                  {selectedBranch.id === 1 ? 'Головное предприятие' : 'Обособленное подразделение'}
                </Badge>
              </div>
              <button
                onClick={() => setSelectedBranch(null)}
                className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-lg"
              >
                <Icon name="X" size={24} />
              </button>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon name="User" size={22} className="text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground mb-1">{selectedBranch.managerTitle}</div>
                  <div className="font-semibold text-lg text-foreground">{selectedBranch.manager}</div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/30">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon name="MapPin" size={22} className="text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground mb-1">Адрес</div>
                  <div className="font-medium text-foreground leading-relaxed">{selectedBranch.address}</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/30">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon name="Mail" size={22} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-muted-foreground mb-1">Email</div>
                    <a 
                      href={`mailto:${selectedBranch.email}`}
                      className="font-medium text-primary hover:underline break-all"
                    >
                      {selectedBranch.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/30">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon name="Phone" size={22} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground mb-1">Телефон</div>
                    <a 
                      href={`tel:${selectedBranch.phone.replace(/[^\d+]/g, '')}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {selectedBranch.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button 
                  className="flex-1 bg-primary hover:bg-primary/90"
                  onClick={() => window.location.href = `mailto:${selectedBranch.email}`}
                >
                  <Icon name="Mail" size={18} className="mr-2" />
                  Написать письмо
                </Button>
                {selectedBranch.phone !== '—' && (
                  <Button 
                    variant="outline"
                    className="flex-1"
                    onClick={() => window.location.href = `tel:${selectedBranch.phone.replace(/[^\d+]/g, '')}`}
                  >
                    <Icon name="Phone" size={18} className="mr-2" />
                    Позвонить
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-agro-green/10 to-agro-green/5 border-agro-green/20">
          <CardContent className="p-6 text-center">
            <div className="text-5xl font-bold text-agro-green mb-2">6</div>
            <div className="text-muted-foreground font-medium">Подразделений</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-agro-lime/10 to-agro-lime/5 border-agro-lime/20">
          <CardContent className="p-6 text-center">
            <div className="text-5xl font-bold text-agro-lime mb-2">1</div>
            <div className="text-muted-foreground font-medium">Регион присутствия</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-agro-yellow/10 to-agro-yellow/5 border-agro-yellow/20">
          <CardContent className="p-6 text-center">
            <div className="text-5xl font-bold text-agro-yellow mb-2">25+</div>
            <div className="text-muted-foreground font-medium">Лет на рынке</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InteractiveMap;
